import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
const moment = _moment;

@Component({
    selector: 'app-demo-core',
    templateUrl: './demo-core.component.html',
    styleUrls: ['./demo-core.component.scss']
})
export class DemoCoreComponent implements OnInit {

    edit: any = {};

    formgroup: FormGroup;
    dateTimeNow = moment();

    constructor(
        private fb: FormBuilder
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
