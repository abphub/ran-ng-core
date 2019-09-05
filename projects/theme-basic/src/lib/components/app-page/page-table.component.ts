import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
    selector: 'ran-page-table',
    templateUrl: './page-table.component.html'
})
export class PageTableComponent implements AfterContentInit {
    @ContentChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @Input() isLoading = true;
    @Input() totalCount = 0;

    showTotalCount = false;

    ngAfterContentInit() {
        this.showTotalCount = this.paginator ? false : true;
    }
}
