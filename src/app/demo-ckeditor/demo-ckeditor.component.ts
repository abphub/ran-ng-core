import { AfterViewInit, Component, OnInit, Renderer2, ViewChild, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select } from '@ngxs/store';
import { RanLayoutState } from 'projects/theme-basic/src/lib/states';
import { Observable } from 'rxjs';
import { Ckeditor5ToolbarComponent } from './../../../projects/ckeditor/src/lib/components/ckeditor5-toolbar.component';

@Component({
    selector: 'ran-demo-ckeditor',
    templateUrl: './demo-ckeditor.component.html',
    styles: ['.fixed-top{position:fixed;top:64px;}']
})
export class DemoCkeditorComponent implements OnInit, AfterViewInit {

    @Select(RanLayoutState.getSidebarContentScoll)
    scoll$: Observable<Event>;

    @ViewChild('ckeditorToolbar', { static: false }) ckeditorToolbar: Ckeditor5ToolbarComponent;

    form: FormGroup;

    constructor(
        private renderer2: Renderer2,
        injector: Injector
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            ckeditorBaseData: new FormControl(''),
            ckeditorClassicData: new FormControl(''),
            ckeditorDocumentData: new FormControl(''),
            ckeditorToolbarData: new FormControl('所见即所得'),
        });
    }

    ngAfterViewInit() {

        const element = this.ckeditorToolbar.hostElement.nativeElement;
        const offset = this.getElementOffset(element);

        const width = element.scrollWidth;
        this.scoll$.subscribe(result => {
            if (result) {
                const scrollTop = (result.target as any).scrollTop;
                if (scrollTop >= offset.top) {
                    this.renderer2.setStyle(element, 'position', 'fixed');
                    this.renderer2.setStyle(element, 'top', '64px');
                    this.renderer2.setStyle(element, 'left', offset.left);
                    this.renderer2.setStyle(element, 'width', width + 'px');
                } else {
                    this.renderer2.setStyle(element, 'position', 'relative');
                    this.renderer2.setStyle(element, 'width', '100%');
                }
            }
        });
    }

    getElementOffset(element: HTMLElement): { left: number, top: number; } {
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
