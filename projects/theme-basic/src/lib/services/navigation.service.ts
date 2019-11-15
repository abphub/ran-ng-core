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
        const appbarNavations = this.getAppbarNavigations(routes);
        this.store.dispatch(new SetAppbarNavigationState(appbarNavations));
    }

    /**
     * 根据点击路由查找可跳转的url
     */
    getNavigationUrlByRoute(route: ABP.FullRoute): string {
        const routes = this.getRoutes(route.children, []);
        for (const _route of routes) {
            if (this.getGrantedPolicy(_route.requiredPolicy) && _route.url && !_route.invisible) {
                return _route.url;
            }
        }
        return route.url || '';
    }


    /**
     * 监听路由变更事件
     * @param event angular路由事件
     */
    setNavigations(event: RouterEvent) {
        const segmentGroup = this.router.parseUrl(event.url).root.children.primary;
        const { flattedRoutes } = this.store.selectSnapshot(ConfigState.getAll);
        const segments = segmentGroup ? segmentGroup.segments : [];

        if (!segments.length) {
            this.setTopbarAndSidebarNavigation([]);
            return;
        }

        // 查找一级菜单中匹配的项
        const route = flattedRoutes.find(m => m.path === segments[0].path);
        // 如果不可见
        if (route.invisible) {
            this.setTopbarAndSidebarNavigation([]);
            return false;
        }

        if (route.parentName) {
            const __routes = flattedRoutes.filter(m => m.parentName === route.parentName);
            this.setSidebarNavigations(__routes);
            this.setTopbarNavigations([]);
        } else {
            this.setTopbarAndSidebarNavigation(route.children || []);
        }

    }

    /**
     * 设置topbar或者sidebar
     * @param routes appbar中当前选中的路由
     */
    setTopbarAndSidebarNavigation(routes: ABP.FullRoute[]) {

        const includes = routes.some(m => m.parentName);
        // 是否包含parentName,如果包含，则设置
        if (includes) {
            this.setTopbarNavigations(routes);
            const route = routes.find(m => window.location.pathname.includes(m.path));
            if (route && this.getRouteGranted(route)) {
                this.setSidebarNavigations(route.children);
                return;
            }

            for (const _route of routes) {
                if (this.getRouteGranted(route)) {
                    this.setSidebarNavigations(route.children);
                    return;
                }
            }
        } else {
            this.setTopbarNavigations([]);
            this.setSidebarNavigations(routes);
        }
    }

    /**
     * 设置app顶部导航，默认为选中第一级路由的子集
     */
    setTopbarNavigations(routes: ABP.FullRoute[]) {
        if (routes && routes.length === 1) {
            routes = [];
        }
        this.store.dispatch(new SetTopbarNavigationState(routes));
    }

    /**
     * 设置app左侧导航，默认为选中的第二级的子集，也就是选中第一级的孙子
     */
    setSidebarNavigations(routes: ABP.FullRoute[]) {
        this.store.dispatch(new SetSidebarNavigationState(routes));
    }

    private getAppbarNavigations(routes: ABP.FullRoute[]): ABP.FullRoute[] {
        const _routers = [];
        for (const item of routes) {
            if (this.getRouteGranted(item)) {
                _routers.push(item);
            }
        }
        return _routers;
    }

    /**
     * 判断路由是否授权
     * @param item item
     */
    private getRouteGranted(item: ABP.FullRoute): boolean {

        if (item.invisible) {
            return false;
        }

        /**
         * 如果没有权限，且无子集
         * 如果有权限，且无子集
         */
        if (
            (!item.requiredPolicy || item.requiredPolicy && this.getGrantedPolicy(item.requiredPolicy) && item.path) &&
            (item.children === undefined || !item.children.length)
        ) {
            return true;
        }

        const routes = this.getRoutes(item.children, []);
        for (const route of routes) {
            if (route.requiredPolicy) {
                if (this.getGrantedPolicy(route.requiredPolicy)) {
                    return true;
                }
            } else {
                return true;
            }
        }

        return false;
    }

    /**
     * 获取最小级路由
     * @param routes 根据路由子数据取最小级数据
     * @param _routes 处理过程变量
     */
    getRoutes(routes: ABP.FullRoute[], _routes: ABP.FullRoute[]) {
        if (routes && routes.length) {
            for (const route of routes) {
                if (route.children && route.children.length) {
                    this.getRoutes(route.children, _routes);
                } else {
                    _routes.push(route);
                }
            }
        }
        return _routes;
    }

    private getGrantedPolicy(requiredPolicy: string): boolean {
        return this.store.selectSnapshot(ConfigState.getGrantedPolicy(requiredPolicy));
    }

}
