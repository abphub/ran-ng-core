import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { PagedListingComponentBase } from 'projects/core/src/public-api';
import { Observable, of } from 'rxjs';
import { ABP } from '@abp/ng.core';
const moment = _moment;

@Component({
    selector: 'app-demo-core',
    templateUrl: './demo-core.component.html',
    styleUrls: ['./demo-core.component.scss']
})
export class DemoCoreComponent implements OnInit {
    headers: string[];
    edit: any = {};

    formgroup: FormGroup;
    dateTimeNow = moment();


    minCheckDate = moment().subtract(5, 'y').format('L');
    maxCheckDate = moment().format('L');

    constructor(
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.formgroup = this.fb.group({
            name: ['', Validators.required],
            weight: ['', Validators.compose([Validators.required, Validators.min(5), Validators.max(8)])],
            height: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])]
        });
    }
}
