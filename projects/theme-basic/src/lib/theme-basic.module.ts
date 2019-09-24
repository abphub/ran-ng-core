import { ABP, ConfigState, CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatBadgeModule, MatButtonModule, MatListModule,
    MatMenuModule, MatSidenavModule, MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { CoreModule as RanCoreModule } from '@ran-ng/core';
import { SpinnerModule } from '@ran-ng/spinner';

import { SetMainNavigationState } from './actions';
import { AccountLayoutComponent } from './components/account-layout.component';
import { AppContainerComponent } from './components/app-container/container.component';
import { AppDrawerComponent } from './components/app-drawer/drawer.component';
import { AppHeaderComponent } from './components/app-header/header.component';
import { PageContentComponent } from './components/app-page/page-content.component';
import { PageHeaderComponent } from './components/app-page/page-header.component';
import { PageTableComponent } from './components/app-page/page-table.component';
import { AppSidebarComponent } from './components/app-sidebar/sidebar.component';
import { ApplicationLayoutComponent } from './components/application-layout.component';
import { EmptyLayoutComponent } from './components/empty-layout.component';
import { RanLayoutState } from './states/layout.state';

export const RAN_LAYOUTS = [ApplicationLayoutComponent, AccountLayoutComponent, EmptyLayoutComponent];

@NgModule({
    declarations: [
        ...RAN_LAYOUTS,
        AppContainerComponent,
        AppHeaderComponent,
        AppSidebarComponent,
        AppDrawerComponent,
        PageHeaderComponent,
        PageContentComponent,
        PageTableComponent
    ],
    imports: [
        NgxsModule.forFeature([RanLayoutState]),
        CoreModule,
        RanCoreModule,
        SpinnerModule,
        ThemeSharedModule,
        CommonModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatBadgeModule,
        MatButtonModule,
        MatMenuModule,
        MatTooltipModule,
    ],
    exports: [
        ...RAN_LAYOUTS,
        PageHeaderComponent,
        PageContentComponent,
        PageTableComponent
    ],
    entryComponents: [...RAN_LAYOUTS]
})
export class ThemeBasicModule {
    constructor(
        router: Router,
        private store: Store
    ) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const segmentGroup = router.parseUrl(event.url).root.children.primary;
                const { routes } = this.store.selectSnapshot(ConfigState.getAll);

                const segments = segmentGroup ? segmentGroup.segments : [];

                if (!segments.length) {
                    this.setMainNavgition([]);
                    return;
                }

                // tslint:disable-next-line: variable-name
                const _routes: ABP.FullRoute[] = routes.reduce((acc, val) => (val.wrapper ? [...acc, ...val.children] : [...acc, val]), [])
                const route = _routes.find(m => m.path === segments[0].path);

                // 如果不可见
                if (route.invisible) {
                    this.setMainNavgition([]);
                    return false;
                }

                //
                if (route.parentName) {
                    const __routes = _routes.filter(m => m.parentName === route.parentName);
                    this.setMainNavgition(__routes);
                } else {
                    this.setMainNavgition(route.children);
                }
            }
        });
    }

    setMainNavgition(routes: ABP.FullRoute[]) {
        this.store.dispatch(new SetMainNavigationState(routes));
    }
}
