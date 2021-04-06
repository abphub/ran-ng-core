import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'ran-ckeditor5-toolbar',
    template: '',
    styles: [`:host{display: block;}`],
})
export class Ckeditor5ToolbarComponent implements AfterViewInit, OnDestroy {

    /**
     * 监听器，默认监听window,支持css选择器
     */
    @Input() selector: string;
    /**
     * 距离顶部的y轴偏移量,默认是body的偏移量0，如果顶部有fixed的导航，很有用
     */
    @Input() offsetTop = 0;

    scrollEvent: Subscription;

    constructor(
        public hostElement: ElementRef<HTMLElement>,
    ) {
    }

    ngAfterViewInit() {
        let target;
        if (this.selector) {
            target = document.querySelector(this.selector);
        } else {
            target = window;
        }

        setTimeout(() => {
            const element = this.hostElement.nativeElement;
            const offsetTop = this.getElementOffsetTop(element);

            this.scrollEvent = fromEvent(target, 'scroll').subscribe((result: Event) => {

                const width = element.offsetWidth;
                const offsetLeft = this.getElementOffsetLeft(element);
                const scrollTop = this.getScrollTop(result);
                // console.log('offsetTop:' + offsetTop, 'scrollTop:' + scrollTop);

                if (scrollTop >= offsetTop) {
                    let style = `position:fixed;`;
                    style += `top:${this.offsetTop}px;`;
                    style += `left:${offsetLeft}px;`;
                    style += `width:${width}px;`;
                    style += `z-index:999;`;
                    element.setAttribute('style', style);
                } else {
                    element.removeAttribute('style');
                }
            });
        }, 0);
    }

    appendChild(ckeditorToolbar: HTMLDivElement) {
        this.hostElement.nativeElement.appendChild(ckeditorToolbar);
    }

    private getElementOffsetTop(element: HTMLElement): number {
        let offsetTop = element.offsetTop;
        let parent = element.offsetParent as HTMLElement;

        /**
         * 现在开始一级一级往上查找，只要没有遇到body，我们就把父级参照物的边框和偏移相加
         */
        while (parent) {
            // 把父级参照物的偏移相加
            offsetTop += parent.offsetTop;
            parent = parent.offsetParent as HTMLElement;
        }
        return offsetTop;
    }

    private getElementOffsetLeft(element: HTMLElement): number {
        let totalLeft = element.offsetLeft;
        let par = element.offsetParent as HTMLElement;

        while (par) {
            // 把父级参照物的偏移相加
            totalLeft += par.offsetLeft;
            par = par.offsetParent as HTMLElement;
        }
        return totalLeft;
    }

    private getScrollTop(result: Event) {
        let scrollTop = 0;
        if (this.selector) {
            scrollTop = (result.target as HTMLElement)?.scrollTop;
        } else {
            scrollTop = document.documentElement.scrollTop;
        }
        return scrollTop;
    }

    ngOnDestroy(): void {
        if (this.scrollEvent) {
            this.scrollEvent.unsubscribe();
        }
    }

}
