import { ConfigState, ConfigStateService, RestService, SessionState, SessionStateService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AbponeState } from '../states/abpone.state';
import { createTokenParser } from '../utils/string-utils';

@Injectable({
    providedIn: 'root',
})
export class MultiTenancyService {

    tenancyPlaceholder = '{0}';

    // 
    locationHref = 'http://preview.limeauto.com.cn/mp/index.html' || window.location.href;

    constructor(
        private store: Store,
        private rest: RestService,
        private configStateService: ConfigStateService,
        private sessionStateService: SessionStateService
    ) {
    }

    async parseTenantFromUrl() {
        await this.parseTenantFromUrlByMultiTenancy();
        await this.parseTenantFromUrlByEnviroment();
    }

    async parseTenantFromUrlByMultiTenancy() {
        const { multiTenancy } = this.store.selectSnapshot(AbponeState.getAbponeState);
        const multiDomainsFormats = multiTenancy.multiDomainsFormat;
        if (multiDomainsFormats && multiDomainsFormats.length) {
            for (let index = 0; index < multiDomainsFormats.length; index++) {
                const tokenParseUrl = multiDomainsFormats[index];
                if (tokenParseUrl) {
                    const currentTenantName = this.getTenantName(tokenParseUrl);
                    if (currentTenantName) {
                        const tenant = await this.findTenant(currentTenantName);
                        if (tenant && tenant.tenantId) {
                            this.sessionStateService.dispatchSetTenant({ id: tenant.tenantId, name: tenant.name })
                        } else {
                            console.error(`${currentTenantName}租户未查询到，请检查后重试`)
                        }
                        break;
                    }
                }
            }
        }
    }

    async parseTenantFromUrlByEnviroment() {
        const { environment } = this.store.selectSnapshot(ConfigState.getAll)
        const multiDomainsFormats = Object.keys(environment.apis).map(m => environment.apis[m].url);
        if (multiDomainsFormats && multiDomainsFormats.length) {
            for (let index = 0; index < multiDomainsFormats.length; index++) {
                const tokenParseUrl = multiDomainsFormats[index];
                if (tokenParseUrl) {
                    const tenant = this.store.selectSnapshot(SessionState.getTenant);
                    if (tenant) {
                        this.setEnvironmentUrl(tenant.name);
                        break;
                    } else {
                        const currentTenantName = this.getTenantName(tokenParseUrl);
                        if (currentTenantName) {
                            this.setEnvironmentUrl(currentTenantName)
                            const tenant = await this.findTenant(currentTenantName);
                            if (tenant && tenant.tenantId) {
                                this.sessionStateService.dispatchSetTenant({ id: tenant.tenantId, name: tenant.name })
                            } else {
                                console.error(`当前域名${this.locationHref}未匹配到租户`)
                            }
                            break;
                        }
                    }
                }
            }
        }
    }

    /**
     * 
     * @param tokenParserUrl 根据tokenParseUrl获取token
     */
    getTenantName(tokenParserUrl: string) {
        const parseTokens = createTokenParser(tokenParserUrl);
        const token = this.tenancyPlaceholder.replace(/[}{]/g, '');
        return parseTokens(this.locationHref)[token]?.[0];
    }

    /**
     * 设置url
     * @param tenantName 当前租户名称
     */
    setEnvironmentUrl(tenantName: string) {
        const { environment } = this.configStateService.getAll();
        // 重置请求接口地址
        environment.oAuthConfig.issuer = this.getParseTenantUrl(environment.oAuthConfig.issuer, tenantName);
        for (const key in environment.apis) {
            const api = environment.apis[key];
            environment.apis[key].url = this.getParseTenantUrl(api.url, tenantName);
        }
    }

    /**
     * 获取格式化后的字符串
     * @param apiUrl 
     * @param tenancyName 
     */
    getParseTenantUrl(apiUrl: string, tenancyName: string) {
        if (apiUrl.includes(this.tenancyPlaceholder)) {
            if (tenancyName === 'abpone') {
                return apiUrl.replace(this.tenancyPlaceholder + '.', '');
            } else {
                return apiUrl.replace(this.tenancyPlaceholder, tenancyName);
            }
        }
        return apiUrl;
    }

    /**
     * 根据名称查找tenant
     * @param tenantName 
     */
    findTenant(tenantName: string) {
        return this.rest.request<any, { tenantId: string; name: string }>({
            url: `/api/abp/multi-tenancy/tenants/by-name/${tenantName}`,
            method: 'GET'
        }, { apiName: 'AbpTenantManagement' }).toPromise();
    }

}