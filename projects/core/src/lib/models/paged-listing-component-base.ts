import { ABP } from '@abp/ng.core';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export abstract class PagedListingComponentBase<T> implements OnInit {

    @ViewChild(MatPaginator, { static: true }) matPaginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) matSort: MatSort;

    isLoading = false;
    result: ABP.PagedResponse<T>;

    public sorting: string;

    private pageNumber = 1;
    public pageSize = 10;
    public totalPages = 1;
    public pageSizeOptions = [10, 25, 50, 100, 300, 500];

    protected _matDialog: MatDialog;
    protected _confirmationService: ConfirmationService;


    constructor(injector: Injector) {
        this.result = { items: [], totalCount: 0 };
        this._matDialog = injector.get(MatDialog);
        this._confirmationService = injector.get(ConfirmationService);
    }

    ngOnInit(): void {
        /**
         * 刷新数据
         */
        this.refresh();

        /**
         * 监听分页方法
         */
        if (this.matPaginator) {
            this.matPaginator.page.subscribe((page: PageEvent) => {
                this.pageSize = page.pageSize;
                this.getDataPage(page.pageIndex + 1);
            });
        }

        /**
         * 监听排序
         */
        if (this.matSort) {
            this.matSort.sortChange.subscribe((sort: { active: string, direction: string }) => {
                this.sorting = sort.active + '' + sort.direction;
                this.refresh();
            });
        }
    }

    refresh(pageNumber?: number): void {
        if (pageNumber) {
            this.getDataPage(pageNumber);
            return;
        }
        this.getDataPage(this.pageNumber);
    }

    /**
     * 数据列表
     * @param request 请求
     * @param successCallback 请求数据
     * @param finishedCallback 请求完数据
     */
    protected abstract getPagedResult(request: ABP.PageQueryParams, successCallback: (result: ABP.PagedResponse<T>) => void): void;

    private getDataPage(page: number): void {
        this.isLoading = true;
        const req: ABP.PageQueryParams = {
            sorting: this.sorting,
            maxResultCount: this.pageSize,
            skipCount: (page - 1) * this.pageSize
        };

        this.getPagedResult(req, (result) => {
            this.isLoading = false;
            this.result = result;
            this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;
            this.pageNumber = page;
        });
    }
}
