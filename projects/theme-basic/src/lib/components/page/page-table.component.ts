import { Component, ContentChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material';

@Component({
    selector: 'ran-page-table',
    templateUrl: './page-table.component.html',
})
export class PageTableComponent {
    @ContentChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @Input() isLoading = true;
    @Input() totalCount: number;
}
