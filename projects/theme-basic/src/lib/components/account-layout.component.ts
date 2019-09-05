import { Component } from '@angular/core';
import { eLayoutType } from '@abp/ng.core';

@Component({
    selector: 'ran-account-layout',
    templateUrl: './account-layout.component.html'
})
export class AccountLayoutComponent {
    static type = eLayoutType.account;
}
