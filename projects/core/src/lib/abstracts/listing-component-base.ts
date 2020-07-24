import { ABP } from '@abp/ng.core';
import { OnInit } from '@angular/core';

/**
 * 如果派生类中实现了OnInit则需要手动执行super.ngOnInit
 */
export abstract class ListingComponentBase<T> implements OnInit {

    isLoading = false;
    result: ABP.PagedItemsResponse<T>;

    constructor() {
        this.result = {
            items: []
        };
    }

    ngOnInit() {
        this.getList();
    }

    getList() {
        this.isLoading = true;
        this.getListResultRequest((items: T[]) => {
            this.result = { items };
            this.isLoading = false;
        }, () => { });
    }

    /**
     * 数据列表方法
     * @param successCallbak 成功回调
     * @param finishedCallback 完成回调
     */
    protected abstract getListResultRequest(successCallback: (result: T[]) => void, finishedCallback?: () => void): void;

}
