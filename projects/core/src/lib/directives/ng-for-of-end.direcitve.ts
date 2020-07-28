import { Directive, Output, Input, EventEmitter } from '@angular/core';

@Directive({
    selector: '[ngForEnd]'
})
export class NgForEndDirective {

    @Output() ngForEndChange = new EventEmitter<boolean>();

    private _last: boolean;
    @Input('ngForEnd')
    public get last(): boolean {
        return this._last;
    }
    public set last(last: boolean) {
        this._last = last;
        if (last) {
            setTimeout(() => {
                this.ngForEndChange.emit(last);
            }, 0);
        }
    }
}
