import { ABP } from '@abp/ng.core';
import { Component, TrackByFunction } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RanLayoutState } from '../../states';

@Component({
    selector: 'ran-app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: ['.active { background: rgba(0, 0, 0, 0.04)!important; }'],
})
export class AppSidebarComponent {

    @Select(RanLayoutState.getMainNavigationState)
    route$: Observable<ABP.FullRoute>;

    public get visibleRoutes$(): Observable<ABP.FullRoute[]> {
        return this.route$.pipe(map(m => m.children));
    }

    public get showSidebar$(): Observable<boolean> {
        return this.visibleRoutes$.pipe(map(m => m && m.length ? true : false));
    }

    trackByFn: TrackByFunction<ABP.FullRoute> = (_, item) => item.name;

    getVisibleRoutes(routes: ABP.FullRoute[]) {
        return routes.reduce((acc, val) => {

            if (val.invisible) {
                return acc;
            }

            if (val.children && val.children.length) {
                val.children = this.getVisibleRoutes(val.children);
            }

            return [...acc, val];
        }, []);
    }
}
