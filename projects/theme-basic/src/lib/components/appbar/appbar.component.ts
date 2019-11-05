import { ABP, Config, ConfigState } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppNavgationService } from '../../services/navigation.service';
import { RanNavigationState } from '../../states/navigation.state';
import { Router } from '@angular/router';

@Component({
    selector: 'ran-appbar',
    templateUrl: './appbar.component.html',
})
export class AppbarComponent {
    @Select(RanNavigationState.getAppbarNavigationState)
    navigations$: Observable<ABP.FullRoute[]>;

    get appInfo(): Config.Application {
        return this.store.selectSnapshot(ConfigState.getApplicationInfo);
    }

    constructor(
        private store: Store,
        private router: Router,
        private appNavigationService: AppNavgationService
    ) {
    }

    navigationByRoute(route: ABP.FullRoute) {
        const url = this.appNavigationService.getNavigationUrlByRoute(route);
        this.router.navigateByUrl(url);
    }
}
