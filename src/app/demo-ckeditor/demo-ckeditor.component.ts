import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RanAnchorDirective } from '@ran-ng/core';

@Component({
    selector: 'ran-demo-ckeditor',
    templateUrl: './demo-ckeditor.component.html'
})
export class DemoCkeditorComponent implements OnInit {

    @ViewChild(RanAnchorDirective, { static: true }) c: RanAnchorDirective;

    form: FormGroup;

    ngOnInit() {
        console.log(this.c);
        this.form = new FormGroup({
            ckeditorBaseData: new FormControl(''),
            ckeditorClassicData: new FormControl(''),
            ckeditorDocumentData: new FormControl('')
        });
    }
}
