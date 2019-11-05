import { ABP, ApplicationConfiguration, Config, ConfigState, GetAppConfiguration, SessionState, SetLanguage } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { SetDrawbarState, SetSidebarState } from '../../actions/layout.action';

@Component({
    selector: 'ran-app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {

    @Select(ConfigState.getOne('currentUser'))
    currentUser$: Observable<ApplicationConfiguration.CurrentUser>;

    @Select(ConfigState.getOne('routes'))
    routes$: Observable<ABP.FullRoute[]>;

    @Select(ConfigState.getDeep('localization.languages'))
    languages$: Observable<ApplicationConfiguration.Language[]>;

    unReadCount = 0;

    navigations: ABP.FullRoute[] = [];

    isOpenChangePassword = false;
    isOpenProfile = false;

    get appInfo(): Config.Application {
        return this.store.selectSnapshot(ConfigState.getApplicationInfo);
    }

    get selectedLangCulture(): string {
        return this.store.selectSnapshot(SessionState.getLanguage);
    }

    constructor(
        private router: Router,
        private store: Store,
        private oauthService: OAuthService
    ) {
    }

    ngOnInit() {
        this.routes$.subscribe(result => {
            this.navigations = this.getNavgitions(result);
            console.log(this.navigations);
        });
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
        this.store.dispatch(new Navigate(['/account/login'], null, { state: { redirectUrl: '' } }));
        this.store.dispatch(new GetAppConfiguration());
    }

    getNavgitions(routes: ABP.FullRoute[]): ABP.FullRoute[] {
        const _routers = [];
        for (const item of routes) {
            if (this.getNavgitionGranted(item)) {
                _routers.push(item);
            }
        }
        return _routers;
    }

    private getNavgitionGranted(item: ABP.FullRoute): boolean {
        if (item.invisible) {
            return false;
        }

        if (item.children && item.children.length) {
            for (const _route of item.children) {
                return this.getNavgitionGranted(_route);
            }
        }

        if (this.getGrantedPolicy(item.requiredPolicy)) {
            return true;
        }

        return false;
    }

    navigationByRoute(route: ABP.FullRoute) {
        const url = this.getNavigationByRoute(route);
        this.router.navigateByUrl(url);
    }

    private getNavigationByRoute(route: ABP.FullRoute): string {

        if (!route.children || !route.children.length) {
            if (this.getGrantedPolicy(route.requiredPolicy) && route.url && !route.invisible) {
                return route.url;
            } else {
                return '';
            }
        } else {
            for (const _route of route.children) {
                return this.getNavigationByRoute(_route);
            }
        }
    }

    private getGrantedPolicy(requiredPolicy: string): boolean {
        return this.store.selectSnapshot(ConfigState.getGrantedPolicy(requiredPolicy));
    }
}
