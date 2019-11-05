import { Injectable } from '@angular/core';
import { RouterEvent, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConfigState, ABP } from '@abp/ng.core';
import { SetSidebarNavigationState, SetAppbarNavigationState, SetTopbarNavigationState } from '../actions/navigation.action';

/**
 * ran-ng-theme模块划分导航service
 * service划分共有三种类型：
 * 1.单一顶部导航型
 * ====适用于功能模块少，但模块下功能比较复杂的类型
 * ====topbar导航
 * 2.单一左侧导航型
 * ====适用于功能模块多，系统功能较简单的类型
 * ====sidebar导航
 * 3.全能型顶部左侧导航型
 * ====适用于:适用于功能模块多，系统功能多的类型
 * ====topbar导航，sidebar导航
 */
@Injectable()
export class AppNavgationService {

    constructor(
        private store: Store,
        private router: Router,
    ) {
    }

    /**
     * 设置app顶部九宫格导航，默认为路由第一级
     */
    setAppbarNavigations() {
        const { routes } = this.store.selectSnapshot(ConfigState.getAll);
        const appbarNavations = this.getRoutes(routes);
        this.store.dispatch(new SetAppbarNavigationState(appbarNavations));
    }

    /**
     * 根据点击路由查找可跳转的url
     */
    getNavigationUrlByRoute(route: ABP.FullRoute): string {
        if (!route.children || !route.children.length) {
            if (this.getGrantedPolicy(route.requiredPolicy) && route.url && !route.invisible) {
                return route.url;
            } else {
                return '';
            }
        } else {
            for (const _route of route.children) {
                return this.getNavigationUrlByRoute(_route);
            }
        }
    }


    /**
     * 监听路由变更事件
     * @param event angular路由事件
     */
    setNavigations(event: RouterEvent) {
        if (event instanceof NavigationEnd) {
            const segmentGroup = this.router.parseUrl(event.url).root.children.primary;
            const { flattedRoutes } = this.store.selectSnapshot(ConfigState.getAll);
            const segments = segmentGroup ? segmentGroup.segments : [];

            if (!segments.length) {
                this.setTopbarOrSidebarNavigation([]);
                return;
            }

            const route = flattedRoutes.find(m => m.path === segments[0].path);
            console.log(route);

            // 如果不可见
            if (route.invisible) {
                this.setTopbarOrSidebarNavigation([]);
                return false;
            }
            //
            if (route.parentName) {
                const __routes = flattedRoutes.filter(m => m.parentName === route.parentName);
                this.setSidebarNavigations(__routes);
            } else {
                this.setTopbarOrSidebarNavigation(route.children);
            }

        }
    }

    /**
     * 设置topbar或者sidebar
     * @param routes appbar中当前选中的路由
     */
    setTopbarOrSidebarNavigation(routes: ABP.Route[]) {
        const includes = routes.some(m => m.parentName);
        console.warn(`includes为${includes}`);
        if (includes) {
            this.setTopbarNavigations(routes);
            this.setSidebarNavigations([]);
        } else {
            this.setTopbarNavigations([]);
            this.setSidebarNavigations(routes);
        }
    }

    /**
     * 设置app顶部导航，默认为选中第一级路由的子集
     */
    setTopbarNavigations(routes: ABP.Route[]) {
        this.store.dispatch(new SetTopbarNavigationState(routes));
    }

    /**
     * 设置app左侧导航，默认为选中的第二级的子集，也就是选中第一级的孙子
     */
    setSidebarNavigations(routes: ABP.Route[]) {
        this.store.dispatch(new SetSidebarNavigationState(routes));
    }

    private getRoutes(routes: ABP.FullRoute[]): ABP.FullRoute[] {
        const _routers = [];
        for (const item of routes) {
            if (this.getRouteGranted(item)) {
                _routers.push(item);
            }
        }
        return _routers;
    }

    private getRouteGranted(item: ABP.FullRoute): boolean {
        if (item.invisible) {
            return false;
        }

        if (item.children && item.children.length) {
            for (const _route of item.children) {
                return this.getRouteGranted(_route);
            }
        }

        if (this.getGrantedPolicy(item.requiredPolicy)) {
            return true;
        }

        return false;
    }

    private getGrantedPolicy(requiredPolicy: string): boolean {
        return this.store.selectSnapshot(ConfigState.getGrantedPolicy(requiredPolicy));
    }

}
