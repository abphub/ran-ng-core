import { ABP } from '@abp/ng.core';
import { Component, TrackByFunction, Inject } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RanNavigationState } from '../../states/navigation.state';
import { THEME_BASIC_OPTIONS, ThemeBasicOptions } from '../../tokens/theme-basic.token';

@Component({
    selector: 'ran-app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: ['.active { background: rgba(0, 0, 0, 0.04)!important; }'],
})
export class AppSidebarComponent {

    @Select(RanNavigationState.getSidebarNavigationState)
    routes$: Observable<ABP.FullRoute[]>;

    constructor(
    ) {
    }

    public get showSidebar$(): Observable<boolean> {
        return this.routes$.pipe(map(m => m && m.some(n => !n.invisible) && m.length ? true : false));
    }

    trackByFn: TrackByFunction<ABP.FullRoute> = (_, item) => item.name;
}
