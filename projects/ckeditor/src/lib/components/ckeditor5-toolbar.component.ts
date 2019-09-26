import { Component, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ran-ckeditor5-toolbar',
    template: '',
    styles: ['./ckeditor5.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Ckeditor5ToolbarComponent {

    constructor(public hostElement: ElementRef<HTMLElement>) { }

    appendChild(ckeditorToolbar: HTMLDivElement) {
        this.hostElement.nativeElement.appendChild(ckeditorToolbar);
    }
}
