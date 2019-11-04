import { eLayoutType, Config, ConfigState } from '@abp/ng.core';
import { slideFromBottom } from '@abp/ng.theme.shared';
import { Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RanLayoutState } from '../states';
import { SetSidebarContentScoll } from '../actions';
import { MatSidenavContainer } from '@angular/material';

@Component({
    selector: 'ran-application-layout',
    templateUrl: './application-layout.component.html',
    styleUrls: ['./application-layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [slideFromBottom],
})
export class ApplicationLayoutComponent implements AfterViewInit {

    static type = eLayoutType.application;

    @ViewChild(MatSidenavContainer, { static: false }) sidenavContainer: MatSidenavContainer;

    @Select(RanLayoutState.getSidebarState)
    sidebarState$: Observable<boolean>;


    @Select(RanLayoutState.getDrawbarState)
    drawbarState$: Observable<boolean>;

    constructor(private store: Store) { }

    get appInfo(): Config.Application {
        return this.store.selectSnapshot(ConfigState.getApplicationInfo);
    }

    ngAfterViewInit() {
        this.sidenavContainer.scrollable.elementScrolled().subscribe(($event: Event) => {
            this.store.dispatch(new SetSidebarContentScoll($event));
        });
    }
}
