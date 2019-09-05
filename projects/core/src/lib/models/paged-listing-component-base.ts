import { ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';


export abstract class PagedListingComponentBase<T> {

    @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) matSort: MatSort;

    private pageNumber = 1;
    private sort: string;

    isLoading = false;
    protected abstract headers: string[] = [];
    protected abstract data$: Observable<T[]>;
    protected abstract totalCount$: Observable<number>;

    public pageSize = 10;
    public totalPages = 1;
    public pageSizeOptions = [10, 25, 50, 100];
}
