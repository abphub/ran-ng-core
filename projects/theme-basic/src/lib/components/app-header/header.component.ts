import { ABP, ApplicationConfiguration, Config, ConfigState, GetAppConfiguration } from '@abp/ng.core';
import { Component } from '@angular/core';
import { RouterState } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SetDrawbarState, SetSidebarState } from '../../actions/layout.action';

@Component({
    selector: 'ran-app-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})
export class AppHeaderComponent {

    @Select(ConfigState.getOne('currentUser'))
    currentUser$: Observable<ApplicationConfiguration.CurrentUser>;

    @Select(ConfigState.getOne('routes'))
    routes$: Observable<ABP.FullRoute[]>;

    unReadCount = 0;

    get visibleRoutes$(): Observable<ABP.FullRoute[]> {
        return this.routes$.pipe(map(m => m.filter(n => !n.invisible)));
    }

    get appInfo(): Config.Application {
        return this.store.selectSnapshot(ConfigState.getApplicationInfo);
    }

    get userName() {
        return this.currentUser$.pipe(map(m => m.userName));
    }

    constructor(
        private store: Store,
        private oauthService: OAuthService
    ) {
    }

    setSidebarState() {
        this.store.dispatch(new SetSidebarState());
    }

    setDrawbarState() {
        this.store.dispatch(new SetDrawbarState());
    }

    logout() {
        this.oauthService.logOut();
        this.store.dispatch(
            new Navigate(['/'], null, {
                state: { redirectUrl: this.store.selectSnapshot(RouterState).state.url },
            }),
        );
        this.store.dispatch(new GetAppConfiguration());
    }

    getNavgition(route: ABP.FullRoute) {

        if (!route.children || !route.children.length) {
            return route.url;
        }

        for (const _route of route.children as ABP.FullRoute[]) {
            if (_route.children && _route.children.length) {
                return this.getNavgition(_route);
            }

            return _route.url;
        }
    }
}
