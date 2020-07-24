import { ABP } from '@abp/ng.core';
import { OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * 如果派生类中实现了OnInit和AfterViewInit,则需要手动执行super.ngOnInit
 */
export abstract class PagedListingComponentBase<T> implements OnInit {


    protected router: Router;
    protected activatedRoute: ActivatedRoute;

    isLoading = false;
    result: ABP.PagedResponse<T>;

    pageIndex = 1;
    pageSize = 10;
    pageSizeOptions = [10, 20, 50, 100];
    sorting: string;

    enabledQueryParams = false;

    constructor(injector: Injector) {
        this.router = injector.get(Router);
        this.activatedRoute = injector.get(ActivatedRoute);
        this.result = {
            items: [],
            totalCount: 0
        };
    }

    ngOnInit(): void {
        this.getPagedList();

        this.activatedRoute.queryParams.subscribe(queryParmas => {
            this.getPagedList(parseInt(queryParmas.pageIndex) || 1);
        })
    }

    getPagedList(pageIndex?: number): void {
        this.isLoading = true;
        this.pageIndex = pageIndex > 0 ? pageIndex : 1;

        if (this.enabledQueryParams && pageIndex > 1) {
            this.router.navigate([], { queryParams: { pageIndex } })
        }

        const request: ABP.PageQueryParams = {
            sorting: this.sorting,
            maxResultCount: this.pageSize,
            skipCount: (this.pageIndex > 0 ? this.pageIndex - 1 : 0) * this.pageSize
        };
        this.getPagedResultRequest(request, (result) => {
            this.isLoading = false;
            this.result = {
                items: result.items,
                totalCount: result.totalCount
            };
        });
    }

    /**
     * 数据列表
     * @param request 请求
     * @param successCallback 请求数据
     * @param finishedCallback 请求完数据
     */
    protected abstract getPagedResultRequest(request: ABP.PageQueryParams, successCallback: (result: ABP.PagedResponse<T>) => void): void;

}
