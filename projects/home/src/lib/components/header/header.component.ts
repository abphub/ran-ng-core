import { ABP, ApplicationConfiguration, Config, ConfigState, GetAppConfiguration, SessionState, SetLanguage } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { RanNavigationState, AppNavgationService, SetSidebarState, SetDrawbarState } from 'projects/theme-basic/src/public-api';


@Component({
    selector: 'ran-home-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {

    @Select(ConfigState.getOne('currentUser'))
    currentUser$: Observable<ApplicationConfiguration.CurrentUser>;

    @Select(ConfigState.getDeep('localization.languages'))
    languages$: Observable<ApplicationConfiguration.Language[]>;

    @Select(RanNavigationState.getAppbarNavigationState)
    navigations$: Observable<ABP.FullRoute[]>;

    unReadCount = 0;


    get appInfo(): Config.Application {
        return this.store.selectSnapshot(ConfigState.getApplicationInfo);
    }

    get selectedLangCulture(): string {
        return this.store.selectSnapshot(SessionState.getLanguage);
    }

    constructor(
        private store: Store,
        private oauthService: OAuthService,
        private appNavationService: AppNavgationService
    ) {
    }

    ngOnInit() {
        this.appNavationService.setAppbarNavigations();
    }

    setSidebarState() {
        this.store.dispatch(new SetSidebarState());
    }

    setDrawbarState() {
        this.store.dispatch(new SetDrawbarState());
    }

    onChangeLang(cultureName: string) {
        this.store.dispatch(new SetLanguage(cultureName));
        window.location.reload();
    }

    logout() {
        this.oauthService.logOut();
        this.store.dispatch(
            new Navigate(['/account/login'], null, {
                state: { redirectUrl: this.store.selectSnapshot(RouterState).state.url },
            }),
        );
        this.store.dispatch(new GetAppConfiguration());
        // 重新设置app导航
        this.appNavationService.setAppbarNavigations();
    }
}
