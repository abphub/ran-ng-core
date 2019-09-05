import { eLayoutType } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RanLayoutState } from '../states';

@Component({
    selector: 'ran-application-layout',
    templateUrl: './application-layout.component.html',
    styleUrls: ['./application-layout.component.scss']
})
export class ApplicationLayoutComponent {
    static type = eLayoutType.application;

    @Select(RanLayoutState.getSidebarState)
    sidebarState$: Observable<boolean>;


    @Select(RanLayoutState.getDrawbarState)
    drawbarState$: Observable<boolean>;
}
