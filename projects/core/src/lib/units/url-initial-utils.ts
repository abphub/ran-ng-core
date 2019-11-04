import { ConfigState, SetTenant, Rest, RestService, Config } from '@abp/ng.core';
import { Injector } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TenantIdResponse } from '@abp/ng.account';


function findTenant(rest: RestService, tenantName: string): Observable<TenantIdResponse> {
    const request: Rest.Request<null> = {
        method: 'GET',
        url: `/api/abp/multi-tenancy/tenants/by-name/${tenantName}`,
    };

    return rest.request<null, TenantIdResponse>(request);
}


const TENANCY_NAME = '{TENANCY_NAME}';

// https://feel.auto.cn/abc/cs://
// https://{TENANCY_NAME}/
function getTenancyName(apiUrl: string): string {
    if (apiUrl.indexOf(TENANCY_NAME) === -1) {
        return null;
    }
    return location.host;
}

export function urlInitialUtils(injector: Injector) {

    const fn = () => {
        const store = injector.get(Store);

        let apiUrl = store.selectSnapshot(ConfigState.getApiUrl());
        console.log('apiUrl', apiUrl);
        let tenancyName = getTenancyName(apiUrl);
        console.log('格式化前的tenancyName', tenancyName);

        return new Promise<void>((resolve) => {
            if (tenancyName) {

                // 设置api地址
                apiUrl = apiUrl.replace(TENANCY_NAME, tenancyName);
                store.subscribe(({ ConfigState }: { ConfigState: Config.State }) => {
                    const environment = ConfigState.environment;
                    environment.apis['default']['url'] = apiUrl;
                    environment.oAuthConfig.issuer = apiUrl;

                    const _tenancyName = tenancyName.replace(/\./g, '-');
                    console.log('格式化后的tenancyName', _tenancyName);

                    resolve();

                    // 设置tenant
                    // const restService = injector.get(RestService);
                    // findTenant(restService, _tenancyName).subscribe(result => {
                    //     store.dispatch(new SetTenant({
                    //         id: result.tenantId,
                    //         name: _tenancyName
                    //     })).subscribe(() => {
                    //         resolve();
                    //     })
                    // })
                })
            } else {
                resolve();
            }
        });
    };

    return fn;
}