
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Pipe({
    name: 'html'
})
export class RanHtmlPipe implements PipeTransform {

    constructor(
        private sanitizer: DomSanitizer) {
    }

    transform(value: string) {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}

