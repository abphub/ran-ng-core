import { ApplicationConfiguration, Config, ConfigState, GetAppConfiguration, ABP } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { RouterState, Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SetDrawbarState, SetSidebarState, SetMainNavgitionState } from '../../actions/layout.action';

@Component({
    selector: 'ran-app-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})
export class AppHeaderComponent implements OnInit {

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
        private router: Router,
        private oauthService: OAuthService
    ) {
    }

    ngOnInit() {
        this.visibleRoutes$.subscribe(result => {
            console.log(result);
        });
    }

    setSidebarState() {
        this.store.dispatch(new SetSidebarState());
    }

    setDrawbarState() {
        this.store.dispatch(new SetDrawbarState());
    }

    setMainNavgition(item: ABP.FullRoute) {
        this.store.dispatch(new SetMainNavgitionState(item));
        if (item.wrapper && item.children.length) {
            this.router.navigateByUrl(item.children[0].path);
        } else {
            this.router.navigateByUrl(item.url);
        }
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

    private getNavgition(routes: ABP.FullRoute[]) {
        for (const { url, children } of routes) {
            if (children && children.length) {
                return this.getNavgition(children);
            }

            return url;
        }
    }
}
