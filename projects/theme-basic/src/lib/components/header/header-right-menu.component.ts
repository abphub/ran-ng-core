import { ApplicationConfiguration, ConfigState, SetLanguage, GetAppConfiguration, SessionState, Config } from '@abp/ng.core';
import { Component, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { SetDrawbarState } from '../../actions/layout.action';
import { AppNavgationService } from '../../services/navigation.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'ran-app-header-right-menu',
    templateUrl: './header-right-menu.component.html',
    styleUrls: ['./header.component.scss']
})
export class AppHeaderRightMenuComponent {

    @Select(ConfigState.getOne('currentUser'))
    currentUser$: Observable<ApplicationConfiguration.CurrentUser>;

    @Select(ConfigState.getDeep('localization.languages'))
    languages$: Observable<ApplicationConfiguration.Language[]>;

    @Input() showHomeButton = false;

    get appInfo(): Config.Application {
        return this.store.selectSnapshot(ConfigState.getApplicationInfo);
    }

    get selectedLangCulture(): string {
        return this.store.selectSnapshot(SessionState.getLanguage);
    }

    unReadCount = 0;

    constructor(
        private store: Store,
        private oauthService: OAuthService,
        private appNavationService: AppNavgationService
    ) {
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
