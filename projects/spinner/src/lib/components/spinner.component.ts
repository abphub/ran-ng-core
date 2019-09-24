import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'ran-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnChanges {

    @Input() loading = false;
    isloading = false;

    constructor(
    ) {
    }

    ngOnChanges(changes) {
        if (changes.loading !== undefined) {
            if (this.loading) {
                this.isloading = changes.loading;
            } else {
                setTimeout(() => {
                    this.isloading = false;
                }, 0);
            }
        }
    }
}
