import { Component, ContentChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
    selector: 'ran-page-table',
    templateUrl: './page-table.component.html',
    styles: [
        ':host{ position: relative;width: 100%;display: inline-block;}'
    ]
})
export class PageTableComponent {
    @ContentChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @Input() isLoading = true;
    @Input() totalCount: number;
}
