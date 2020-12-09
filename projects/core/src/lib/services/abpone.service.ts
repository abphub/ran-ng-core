import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Abpone } from '../models/abpone';
import { ABPONE_CORE_OPTIONS } from '../tokens/abpone.token';

@Injectable({
    providedIn: 'root',
})
export class AbponeService {

    constructor(
        private http: HttpClient,
        @Inject(ABPONE_CORE_OPTIONS) private options: Abpone.Root
    ) {
    }

    getConfigFromJson() {
        const { configFromJson } = this.options;
        if (!configFromJson) {
            return;
        }

        let jsonSourceUrl = 'assets/abpone.json';
        if (typeof configFromJson === 'string') {
            jsonSourceUrl = configFromJson;
        }
        return this.http.get<Abpone.Config>(jsonSourceUrl).toPromise();
    }
}