import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { ModalService, PagedListingComponentBase } from 'projects/core/src/public-api';
import { Observable, of } from 'rxjs';
import { ABP } from '@abp/ng.core';
const moment = _moment;

@Component({
    selector: 'app-demo-core',
    templateUrl: './demo-core.component.html',
    styleUrls: ['./demo-core.component.scss']
})
export class DemoCoreComponent extends PagedListingComponentBase<any> implements OnInit {

    edit: any = {};

    formgroup: FormGroup;
    dateTimeNow = moment();

    constructor(
        injector: Injector,
        private fb: FormBuilder,
        private modalService: ModalService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.formgroup = this.fb.group({
            name: ['', Validators.required],
            weight: ['', Validators.compose([Validators.required, Validators.min(5), Validators.max(8)])],
            height: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])]
        });
        this.refresh();
    }

    protected getPagedResult(request: ABP.PageQueryParams, successCallback?: (result: ABP.PagedResponse<any>) => void): any {
        console.log('走子类了');
        successCallback({ totalCount: 10, items: [] });
    }
}
