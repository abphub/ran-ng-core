import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'ran-ckeditor5-toolbar',
    templateUrl: 'ckeditor5-toolbar.component.html'
})
export class Ckeditor5ToolbarComponent {

    constructor(private hostElement: ElementRef<HTMLElement>) { }

    appendChild(ckeditorToolbar: HTMLDivElement) {
        this.hostElement.nativeElement.appendChild(ckeditorToolbar);
    }
}
