import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'ran-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class RanSpinnerComponent implements OnChanges {

    _loading = false;
    @Input() loading = false;

    constructor(
    ) {
    }

    ngOnChanges(changes) {
        if (changes.loading !== undefined) {
            if (this.loading) {
                this._loading = changes.loading;
            } else {
                setTimeout(() => {
                    this._loading = false;
                }, 0);
            }
        }
    }
}
