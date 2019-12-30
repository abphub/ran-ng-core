import { Config, ConfigState, eLayoutType } from '@abp/ng.core';
import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
    selector: 'ran-account-layout',
    templateUrl: './account-layout.component.html',
    styleUrls: ['./account-layout.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AccountLayoutComponent {
    static type = eLayoutType.account;

    get appInfo(): Config.Application {
        return this.store.selectSnapshot(ConfigState.getApplicationInfo);
    }

    get backgroundImage(): string {
        return `url(${this.store.selectSnapshot(ConfigState.getApiUrl())}/common/images/login-bg.png)`;
    }

    constructor(
        private store: Store,
    ) {
    }
}

