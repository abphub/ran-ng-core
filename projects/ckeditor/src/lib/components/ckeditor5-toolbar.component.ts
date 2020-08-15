import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'ran-ckeditor5-toolbar',
    template: '',
    styles: [`ran-ckeditor5-toolbar {display: block;}`],
})
export class Ckeditor5ToolbarComponent implements AfterViewInit, OnDestroy {

    /**
     * 选择器，默认监听window
     */
    @Input() selector: string;
    /**
     * 距离顶部的y轴偏移量,默认是0
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

                const offsetLeft = this.getElementOffsetLeft(element);
                const width = element.offsetWidth;

                const scrollTop = (result.target as HTMLElement).scrollTop;
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
        let totalTop = 0;
        let par = element.offsetParent as HTMLElement;

        /**
         * 现在开始一级一级往上查找，只要没有遇到body，我们就把父级参照物的边框和偏移相加
         */
        while (par) {
            // 不是IE8我们才进行累加父级参照物的边框
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                totalTop += par.clientTop;
            }
            // 把父级参照物的偏移相加
            totalTop += par.offsetTop;
            par = par.offsetParent as HTMLElement;
        }
        return totalTop;
    }

    private getElementOffsetLeft(element: HTMLElement): number {
        let totalLeft = element.offsetLeft;
        let par = element.offsetParent as HTMLElement;

        while (par) {
            // 不是IE8我们才进行累加父级参照物的边框
            if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
                totalLeft += par.clientLeft;
            }
            // 把父级参照物的偏移相加
            totalLeft += par.offsetLeft;
            par = par.offsetParent as HTMLElement;
        }
        return totalLeft;
    }

    ngOnDestroy(): void {
        if (this.scrollEvent) {
            this.scrollEvent.unsubscribe();
        }
    }

}
