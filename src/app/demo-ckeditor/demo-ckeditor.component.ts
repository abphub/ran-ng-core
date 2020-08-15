import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ckeditor5ToolbarComponent } from './../../../projects/ckeditor/src/lib/components/ckeditor5-toolbar.component';

@Component({
    selector: 'ran-demo-ckeditor',
    templateUrl: './demo-ckeditor.component.html',
    styles: ['.fixed-top{position:fixed;top:64px;}']
})
export class DemoCkeditorComponent implements OnInit {

    @ViewChild('ckeditorToolbar', { static: false }) ckeditorToolbar: Ckeditor5ToolbarComponent;

    form: FormGroup;

    constructor(
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            ckeditorBaseData: new FormControl(''),
            ckeditorClassicData: new FormControl(''),
            ckeditorDocumentData: new FormControl(''),
            ckeditorToolbarData: new FormControl('所见即所得'),
        });
    }
}
