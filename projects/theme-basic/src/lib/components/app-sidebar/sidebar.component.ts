import { ABP } from '@abp/ng.core';
import { Component, TrackByFunction } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RanLayoutState } from '../../states';

@Component({
    selector: 'ran-app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class AppSidebarComponent {

    @Select(RanLayoutState.getMainNavigationState)
    route$: Observable<ABP.FullRoute>;

    get visibleRoutes$(): Observable<ABP.FullRoute[]> {
        return this.route$.pipe(map(m => m.children));
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
