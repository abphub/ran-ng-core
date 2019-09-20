import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'ran-page-content',
    templateUrl: './page-content.component.html',
    styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent {

    constructor(private _hostElement: ElementRef<HTMLElement>) { }

    getContentOffsetWidth(): number {
        return this._hostElement.nativeElement.offsetWidth;
    }
}
