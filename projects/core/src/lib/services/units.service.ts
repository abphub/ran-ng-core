import { Injectable, ViewContainerRef, Type, ComponentRef, ComponentFactoryResolver } from '@angular/core';

@Injectable()
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

    getElementOffsetParentElement(element: HTMLElement, parentElement?: HTMLElement, ): { left: number, top: number; } {
        let totalLeft = null;
        let totalTop = null;
        totalLeft += element.offsetLeft;
        // totalTop += element.offsetTop;

        let par = element.offsetParent as HTMLElement;

        /**
         * 现在开始一级一级往上查找，只要没有遇到body，我们就把父级参照物的边框和偏移相加
         */
        while (par) {
            // 不是IE8我们才进行累加父级参照物的边框
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                totalTop += par.clientTop;
                totalLeft += par.clientLeft;
            }
            // 把父级参照物的偏移相加
            totalTop += par.offsetTop;
            totalLeft += par.offsetLeft;
            par = par.offsetParent as HTMLElement;
        }
        return { left: totalLeft, top: totalTop };
    }
}
