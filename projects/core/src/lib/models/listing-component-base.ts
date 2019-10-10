import { ABP } from '@abp/ng.core';
import { ConfirmationService } from '@abp/ng.theme.shared';
import { Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

export abstract class ListingComponentBase<T> implements OnInit {

    isLoading = false;
    result: ABP.PagedItemsResponse<T>;
    protected _matDialog: MatDialog;
    protected _confirmationService: ConfirmationService;

    constructor(injector: Injector) {
        this._matDialog = injector.get(MatDialog);
        this._confirmationService = injector.get(ConfirmationService);
        this.result = {
            items: []
        };
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.isLoading = true;
        this.getListResult((items: T[]) => {
            this.result = { items };
            this.isLoading = false;
        }, () => { });
    }

    /**
     * 数据列表方法
     * @param successCallbak 成功回调
     * @param finishedCallback 完成回调
     */
    protected abstract getListResult(successCallback: (result: T[]) => void, finishedCallback?: () => void);
}
