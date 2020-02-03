import { ConfigState, SetTenant, Rest, RestService, Config } from '@abp/ng.core';
import { Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TenantIdResponse } from '@abp/ng.account';
import { Title } from '@angular/platform-browser';


function findTenant(rest: RestService, tenantName: string): Observable<TenantIdResponse> {
    const request: Rest.Request<null> = {
        method: 'GET',
        url: `/api/abp/multi-tenancy/tenants/by-name/${tenantName}`,
    };

    return rest.request<null, TenantIdResponse>(request);
}


const TENANCY_NAME = '{TENANCY_NAME}';
const DOMAIN_SUFFIX = '{DOMAIN_SUFFIX}'

// https://feel.auto.cn/abc/cs://
// https://{TENANCY_NAME}/

function getConfigureUrl(apiUrl: string): string {
    // const originUrl = location.origin;
    const originUrl = 'lyauto.com.cn'

    if (apiUrl.indexOf(TENANCY_NAME) === -1) {
        const findIndex = apiUrl.indexOf(DOMAIN_SUFFIX);
        if (findIndex === -1) {
            return null;
        } else {
            return originUrl.slice(findIndex);
        }
    }

    const findIndex = apiUrl.indexOf(TENANCY_NAME);
    if (findIndex === -1) {
        return null;
    } else {
        return originUrl.slice(findIndex);
    }

}

function getTenancyName(apiUrl: string, configureUrl: string): string {
    if (apiUrl.indexOf(TENANCY_NAME) === -1) {
        return null;
    }
    const findIndex = configureUrl.indexOf('.')
    const tenancyName = configureUrl.slice(0, findIndex)
    return tenancyName;
}

function getDomainSuffix(apiUrl: string, configureUrl: string): string {
    if (apiUrl.indexOf(DOMAIN_SUFFIX) === -1) {
        return null;
    }
    if (apiUrl.indexOf(TENANCY_NAME) === -1) {
        return configureUrl
    }
    const findIndex = configureUrl.indexOf('.')
    const domainSuffix = configureUrl.slice(findIndex + 1)
    return domainSuffix;
}

export function urlInitialUtils(injector: Injector) {

    const fn = () => {
        const store = injector.get(Store);
        const titleService = injector.get(Title)

        let apiUrl = store.selectSnapshot(ConfigState.getApiUrl());

        let tenancyName = '';
        let domainSuffix = '';
        if (apiUrl.indexOf(TENANCY_NAME) !== -1) {
            const hostUrl = location.host;
            const findIndex = hostUrl.indexOf('.')
            tenancyName = hostUrl.slice(0, findIndex);
            domainSuffix = hostUrl.slice(findIndex + 1);
        }
debugger
        return new Promise<void>((resolve) => {
            if (domainSuffix) {
                apiUrl = apiUrl.replace(DOMAIN_SUFFIX, domainSuffix);
            }
            if (tenancyName) {

                // 设置api地址
                // apiUrl = apiUrl.replace(TENANCY_NAME, tenancyName);
                apiUrl = apiUrl.replace(TENANCY_NAME, tenancyName);

                store.subscribe(({ ConfigState }: { ConfigState: Config.State }) => {
                    const environment = ConfigState.environment;
                    environment.apis['default']['url'] = apiUrl;
                    environment.oAuthConfig.issuer = apiUrl;
                    console.log(environment.application['tenatants']);
                    const tenatants = environment.application['tenatants'];
                    const findTenant = tenatants.find(n => n.name === tenancyName);
                    if (findTenant) {
                        environment.application.name = findTenant.displayName;
                        environment.application.logoUrl = findTenant.logoUrl;
                        titleService.setTitle(findTenant.displayName);
                    }
                    resolve();

                    // 设置tenant
                    const restService = injector.get(RestService);
                    findTenant(restService, tenancyName).subscribe(result => {
                        store.dispatch(new SetTenant({
                            id: result.tenantId,
                            name: tenancyName
                        })).subscribe(() => {
                            resolve();
                        })
                    })
                })
            } else {
                resolve();
            }
        });
    };

    return fn;
}