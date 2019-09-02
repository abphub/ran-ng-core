import { Injectable, ViewContainerRef, Type, ComponentRef, ComponentFactoryResolver } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UnitsService {

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

    /**
     * 动态加载组件
     * @param container 动态组件盒子
     * @param component 需要加载的组件
     * @param componentLoaded 组件加载完毕钩子
     */
    dynamicLoadComponent<T>(
        container: ViewContainerRef,
        component: Type<T>
    ): ComponentRef<T> {
        if (!component) {
            throw new Error(`燃点网站云提醒您：未成功加载<===${component}===>组件【参数component不能为undefined】`);
        }

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const compoentRef = container.createComponent(componentFactory);
        return compoentRef;
    }
}
