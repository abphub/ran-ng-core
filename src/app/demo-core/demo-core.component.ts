import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { ModalService } from 'projects/core/src/public-api';
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
        private fb: FormBuilder,
        private modalService: ModalService
    ) {
    }

    ngOnInit() {
        console.log(this.modalService);
        this.formgroup = this.fb.group({
            name: ['', Validators.required],
            weight: ['', Validators.compose([Validators.required, Validators.min(5), Validators.max(8)])],
            height: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])]
        });
    }
}
