import { Component } from '@angular/core';
import { RanNavigationState } from '../../states/navigation.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ABP, ConfigState, Config } from '@abp/ng.core';

@Component({
    selector: 'ran-app-header-bar',
    templateUrl: './headerbar.component.html'
})
export class AppHeaderBarComponent {

    @Select(RanNavigationState.getTopbarNavigationState)
    navigations$: Observable<ABP.FullRoute[]>;

    get appInfo(): Config.Application {
        return this.store.selectSnapshot(ConfigState.getApplicationInfo);
    }

    constructor(
        private store: Store
    ) {
    }
}
