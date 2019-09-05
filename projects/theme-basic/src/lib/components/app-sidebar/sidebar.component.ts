import { ABP, ConfigState } from '@abp/ng.core';
import { Component, TrackByFunction } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ran-app-sidebar',
    templateUrl: './sidebar.component.html'
})
export class AppSidebarComponent {

    @Select(ConfigState.getOne('routes'))
    routes$: Observable<ABP.FullRoute[]>;

    get visibleRoutes$(): Observable<ABP.FullRoute[]> {
        return this.routes$.pipe(map(routes => this.getVisibleRoutes(routes)));
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

    logout() {

    }

    toggleDrawbar() {

    }
}
