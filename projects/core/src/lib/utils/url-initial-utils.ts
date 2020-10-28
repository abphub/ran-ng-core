import { TenantIdResponse } from '@abp/ng.account';
import { Rest, RestService, SetTenant } from '@abp/ng.core';
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

export function urlInitialUtils(injector: Injector) {

    const fn = () => {
        return new Promise<void>((resolve) => {
            const store = injector.get(Store);

            const tenancyName = location.host.indexOf('.') === -1 ? location.host : location.host.split('.')[0];
            // 如果tenancyName种含有.则替换成-
            const _tenancyName = tenancyName.replace(/\./g, '-');

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