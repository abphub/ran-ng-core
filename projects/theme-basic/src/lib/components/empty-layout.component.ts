import { Component } from '@angular/core';
import { eLayoutType } from '@abp/ng.core';

@Component({
    selector: 'ran-layout-empty',
    templateUrl: './empty-layout.component.html'
})
export class EmptyLayoutComponent {
    static type = eLayoutType.empty;
}
