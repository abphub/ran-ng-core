import { ABP } from '@abp/ng.core';
import { ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalService } from '../services/modal.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

/**
 * 如果派生类中实现了OnInit则需要手动执行super.ngOnInit
 */
export abstract class ListingComponentBase<T> implements OnInit {

    isLoading = false;
    result: ABP.PagedItemsResponse<T>;

    protected _matDialog: MatDialog;
    protected _modalService: ModalService;
    protected _confirmationService: ConfirmationService;
    protected _toasterService: ToasterService;

    constructor(injector: Injector) {
        this._matDialog = injector.get(MatDialog);
        this._confirmationService = injector.get(ConfirmationService);
        this._toasterService = injector.get(ToasterService);
        this._modalService = injector.get(ModalService);

        this.result = {
            items: []
        };
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.isLoading = true;
        this.getListResult()
            .pipe(finalize(() => this.isLoading = false))
            .subscribe(result => {
                this.isLoading = false;
                this.result = result;
            });
    }

    /**
     * 获取列表数据
     */
    protected abstract getListResult(): Observable<ABP.PagedItemsResponse<T>>;
}
