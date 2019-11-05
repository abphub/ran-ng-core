import { ABP } from '@abp/ng.core';
import { Component, TrackByFunction } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RanNavigationState } from '../../states/navigation.state';

@Component({
    selector: 'ran-app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: ['.active { background: rgba(0, 0, 0, 0.04)!important; }'],
})
export class AppSidebarComponent {

    @Select(RanNavigationState.getSidebarNavigationState)
    routes$: Observable<ABP.FullRoute[]>;

    public get showSidebar$(): Observable<boolean> {
        return this.routes$.pipe(map(m => m && m.length ? true : false));
    }

    trackByFn: TrackByFunction<ABP.FullRoute> = (_, item) => item.name;
}
