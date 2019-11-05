import { ABP, ApplicationConfiguration, Config, ConfigState, GetAppConfiguration, SessionState, SetLanguage } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { SetDrawbarState, SetSidebarState } from '../../actions/layout.action';
import { RanNavigationState } from '../../states/navigation.state';
import { AppNavgationService } from '../../services/navigation.service';

@Component({
    selector: 'ran-app-header',
    templateUrl: './header.component.html'
})
export class AppHeaderComponent implements OnInit {

    @Select(ConfigState.getOne('currentUser'))
    currentUser$: Observable<ApplicationConfiguration.CurrentUser>;

    @Select(ConfigState.getDeep('localization.languages'))
    languages$: Observable<ApplicationConfiguration.Language[]>;

    @Select(RanNavigationState.getAppbarNavigationState)
    navigations$: Observable<ABP.FullRoute[]>;

    unReadCount = 0;
    isOpenChangePassword = false;
    isOpenProfile = false;

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
        console.log('headerbar onInit,setAppbarNavigations');
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
            new Navigate(['/'], null, {
                state: { redirectUrl: this.store.selectSnapshot(RouterState).state.url },
            }),
        );
        this.store.dispatch(new GetAppConfiguration());
        // 重新设置app导航
        this.appNavationService.setAppbarNavigations();
    }
}
