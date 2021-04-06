import { ConfigState, ConfigStateService, GetAppConfiguration, SessionStateService } from '@abp/ng.core';
import { Injector, isDevMode } from '@angular/core';
import { Store } from '@ngxs/store';
import { OAuthService } from 'angular-oauth2-oidc';
import * as _moment from 'moment';
import { tap } from 'rxjs/operators';
import { SetAbponeState } from '../actions/abpone.action';
import { momentDifferentLocales } from '../constants/different-locales';
import { AbponeService } from '../services/abpone.service';
import { MultiTenancyService } from '../services/multi-tenancy.service';

const moment = _moment;

export function abponeUtils(injector: Injector) {
    const fn = async () => {
        const abponeService = injector.get(AbponeService);
        const store = injector.get(Store);
        const sessionState = injector.get(SessionStateService);
        const configStateService = injector.get(ConfigStateService);

        // setEnvironment
        const config = await abponeService.getConfigFromJson();

        if (config) {
            // 存状态
            store.dispatch(new SetAbponeState(config));

            if (config.environment) {
                isDevMode() ? configStateService.dispatchSetEnvironment(config.environment.dev) : configStateService.dispatchSetEnvironment(config.environment.prod);
            }
        }

        const multiTenancyService = injector.get(MultiTenancyService)
        await multiTenancyService.parseTenantFromUrl();

        return store
            .dispatch(new GetAppConfiguration())
            .pipe(
                tap((() => {
                    // 设置monent默认语言
                    moment.locale(momentDifferentLocales[sessionState.getLanguage()] || 'zh-Hans');
                    return checkAccessToken(store, injector)
                }))
            )
            .toPromise();
    };
    return fn;
}

export function checkAccessToken(store: Store, injector: Injector) {
    var oAuth = injector.get(OAuthService);
    if (oAuth.hasValidAccessToken() && !store.selectSnapshot(ConfigState.getDeep('currentUser.id'))) {
        oAuth.logOut();
    }
}
