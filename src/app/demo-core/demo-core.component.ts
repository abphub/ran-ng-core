import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-demo-core',
    templateUrl: './demo-core.component.html',
    styleUrls: ['./demo-core.component.scss']
})
export class DemoCoreComponent implements OnInit {

    formgroup: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.formgroup = this.fb.group({
            name: ['', Validators.required],
            weight: ['', Validators.required],
            height: ['', Validators.required]
        });
    }
}
