import { TenantIdResponse } from '@abp/ng.account';
import { ConfigStateService, Rest, RestService, SetTenant } from '@abp/ng.core';
import { Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';


function findTenant(rest: RestService, tenantName: string): Observable<TenantIdResponse> {
    const request: Rest.Request<null> = {
        method: 'GET',
        url: `/api/abp/multi-tenancy/tenants/by-name/${tenantName}`,
    };

    return rest.request<null, TenantIdResponse>(request);
}


const TENANCY_NAME = '{TENANCY_NAME}';

function getReplaceUrl(apiUrl: string, tenancyName: string) {
    if (apiUrl.includes(TENANCY_NAME)) {
        if (tenancyName === 'abpone') {
            return apiUrl.replace(TENANCY_NAME + '.', '');
        } else {
            return apiUrl.replace(TENANCY_NAME, tenancyName);
        }
    }
    return apiUrl;
}

export function urlInitialUtils(injector: Injector) {

    const fn = () => {
        return new Promise<void>((resolve) => {
            const store = injector.get(Store);
            const configStateService = injector.get(ConfigStateService);

            const tenancyName = location.host.indexOf('.') === -1 ? location.host : location.host.split('.')[0];
            // 如果tenancyName种含有.则替换成-
            const _tenancyName = tenancyName.replace(/\./g, '-');

            const environment = configStateService.getAll().environment;
            environment.oAuthConfig.issuer = getReplaceUrl(environment.oAuthConfig.issuer, tenancyName);

            for (const key in environment.apis) {
                const api = environment.apis[key];
                environment.apis[key].url = getReplaceUrl(api.url, tenancyName);
            }

            const restService = injector.get(RestService);
            // 设置tenant
            findTenant(restService, _tenancyName).subscribe(result => {
                if (result.success) {
                    store.dispatch(new SetTenant({
                        id: result.tenantId,
                        name: _tenancyName
                    })).subscribe(() => {
                        resolve();
                    })
                } else {
                    resolve();
                }
            })
        });
    };

    return fn;
}