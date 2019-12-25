import { Rest, RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Home } from '../models/home.model';


@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(private rest: RestService) { }
    getTenantApplications(): Observable<Home.ITenantApplicationResponse> {
        const request: Rest.Request<null> = {
            method: 'GET',
            url: `/api/Home/TenantApplication`,
        };
        return this.rest.request<null, Home.ITenantApplicationResponse>(request);
    }

    getTenantApplicationsById(id: string, tenantId: string): Observable<Home.ITenantApplicationResponse> {
        const request: Rest.Request<null> = {
            method: 'GET',
            url: `/api/Home/TenantApplication/${id}`,
            params: { tenantId }
        };
        return this.rest.request<null, Home.ITenantApplicationResponse>(request);
    }

}
