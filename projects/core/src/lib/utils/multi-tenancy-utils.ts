
import { ConfigStateService, RestService, SessionStateService } from '@abp/ng.core';
import { Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { AbponeState } from '../states/abpone.state';
import { createTokenParser } from './string-utils';

const tenancyPlaceholder = '{0}';

export async function parseTenantFromUrl(injector: Injector) {
    const store = injector.get(Store);
    const configStateService = injector.get(ConfigStateService);
    const { environment } = configStateService.getAll();

    const abponeState = store.selectSnapshot(AbponeState.getAbponeState);
    if (abponeState?.multiTenancy?.multiDomainsFormat) {
        await parseTenantFromUrlBymultiTenancy(injector, abponeState.multiTenancy.multiDomainsFormat);
    }
    const multiDomainsFormat = Object.keys(environment.apis).map(m => environment.apis[m].url);
    if (multiDomainsFormat) {
        await parseTenantFromUrlByEnviroment(injector, multiDomainsFormat);
    }
}

export async function parseTenantFromUrlBymultiTenancy(injector: Injector, multiDomainsFormat: string[]) {
    const currentTenantName = getCurrentTenantNameByMultiDomainsFormat(multiDomainsFormat);
    if (currentTenantName) {
        const tenant = await findTenant(injector, currentTenantName);
        if (tenant) {
            const sessionStateService = injector.get(SessionStateService);
            sessionStateService.dispatchSetTenant({ id: tenant.id, name: tenant.name })
        } else {
            console.error(`${currentTenantName}租户未查询到，请检查后重试`)
        }
    }
}

export async function parseTenantFromUrlByEnviroment(injector: Injector, multiDomainsFormat: string[]) {
    const sessionStateService = injector.get(SessionStateService);
    const tenant = sessionStateService.getTenant();
    if (tenant) {
        setEnvironmentUrl(injector, tenant.name)
    } else {
        const currentTenantName = getCurrentTenantNameByMultiDomainsFormat(multiDomainsFormat);
        if (currentTenantName) {
            setEnvironmentUrl(injector, currentTenantName)
            const tenant = await findTenant(injector, currentTenantName);
            if (tenant) {
                sessionStateService.dispatchSetTenant({ id: tenant.id, name: tenant.name })
            } else {
                console.error(`当前域名${window.location.href}未匹配到租户`)
            }
        }
    }
}

export function getCurrentTenantNameByMultiDomainsFormat(multiDomainsFormat: string[]) {
    const tokenParserUrl = multiDomainsFormat.find(m => m.includes(tenancyPlaceholder));
    const parseTokens = createTokenParser(tokenParserUrl);
    const token = tenancyPlaceholder.replace(/[}{]/g, '');
    return parseTokens(window.location.href)[token]?.[0];
}

export const getParseTenantUrl = (apiUrl: string, tenancyName: string) => {
    if (apiUrl.includes(tenancyPlaceholder)) {
        if (tenancyName === 'abpone') {
            return apiUrl.replace(tenancyPlaceholder + '.', '');
        } else {
            return apiUrl.replace(tenancyPlaceholder, tenancyName);
        }
    }
    return apiUrl;
}

export function setEnvironmentUrl(injector: Injector, currentTenantName: string) {
    const configStateService = injector.get(ConfigStateService);
    const { environment } = configStateService.getAll();

    // 重置请求接口地址
    environment.oAuthConfig.issuer = getParseTenantUrl(environment.oAuthConfig.issuer, currentTenantName);
    for (const key in environment.apis) {
        const api = environment.apis[key];
        environment.apis[key].url = getParseTenantUrl(api.url, currentTenantName);
    }
}

export function findTenant(injector: Injector, tenantName: string) {
    const rest = injector.get(RestService)
    return rest.request<any, { id: string; name: string }>({ url: `/api/abp/multi-tenancy/tenants/by-name/${tenantName}`, method: 'GET' }, { apiName: 'Abpone' }).toPromise();
}