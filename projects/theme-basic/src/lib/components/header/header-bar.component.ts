import { Config, ConfigState } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AppNavgationService } from '../../services/navigation.service';

@Component({
    selector: 'ran-app-header',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header.component.scss']
})
export class AppHeaderBarComponent implements OnInit {

    get appInfo(): Config.Application {
        return this.store.selectSnapshot(ConfigState.getApplicationInfo);
    }

    constructor(
        private store: Store,
        private appNavationService: AppNavgationService
    ) {
    }

    ngOnInit() {
        this.appNavationService.setAppbarNavigations();
    }
}
