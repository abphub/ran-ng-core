import { ABP } from '@abp/ng.core';
import { ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { AfterViewInit, Injector, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { ModalService } from '../services/modal.service';

/**
 * 如果派生类中实现了OnInit和AfterViewInit,则需要手动执行super.ngOnInit,super.ngAfterViewInit
 */
export abstract class PagedListingComponentBase<T> implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) matSort: MatSort;

    isLoading = false;
    result: ABP.PagedResponse<T>;

    public sorting: string;

    private pageNumber = 1;
    public pageSize = 10;
    public totalPages = 1;
    public pageSizeOptions = [10, 25, 50, 100, 300, 500];

    protected _matDialog: MatDialog;
    protected _modalService: ModalService;
    protected _confirmationService: ConfirmationService;
    protected _toasterService: ToasterService;

    constructor(injector: Injector) {
        this._matDialog = injector.get(MatDialog);
        this._modalService = injector.get(ModalService);
        this._confirmationService = injector.get(ConfirmationService);
        this._toasterService = injector.get(ToasterService);
        this.result = {
            items: [],
            totalCount: 0
        };
    }

    ngOnInit(): void {
        this.refresh();
    }

    ngAfterViewInit() {
        if (this.matPaginator) {
            this.matPaginator.page.subscribe((page: PageEvent) => {
                this.pageSize = page.pageSize;
                this.getDataPage(page.pageIndex + 1);
            });
        }

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
            this.matPaginator.pageIndex = pageNumber;
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
