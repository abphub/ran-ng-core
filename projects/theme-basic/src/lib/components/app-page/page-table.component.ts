import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
    selector: 'ran-page-table',
    templateUrl: './page-table.component.html',
    styles: [
        ':host{ position: relative;width: 100%;display: inline-block;}'
    ]
})
export class PageTableComponent implements AfterContentInit {
    @ContentChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @Input() isLoading = true;

    // tslint:disable-next-line:
    private _totalCount = 0;
    @Input()
    public get totalCount(): number {
        return this._totalCount;
    }
    public set totalCount(value: number) {
        this._totalCount = value;
        if (value !== undefined && value !== null) {
            this.stringTotalCount = value.toString();
        }
    }

    showTotalCount = false;
    stringTotalCount: string;

    ngAfterContentInit() {
        this.showTotalCount = this.paginator ? false : true;
    }
}
