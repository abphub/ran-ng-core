import { ApplicationConfiguration, ConfigState, GetAppConfiguration } from '@abp/ng.core';
import { Component } from '@angular/core';
import { RouterState } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { SetDrawbarState, SetSidebarState } from '../../actions/layout.action';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ran-app-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html'
})
export class AppHeaderComponent {

    @Select(ConfigState.getOne('currentUser'))
    currentUser$: Observable<ApplicationConfiguration.CurrentUser>;

    get userName() {
        return this.currentUser$.pipe(map(m => m.userName));
    }

    get pictureAvatar() {
        return '';
    }

    unReadCount = 0;

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
}
