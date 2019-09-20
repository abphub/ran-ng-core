import { CoreModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeBasicModule } from 'projects/theme-basic/src/public-api';
import { DemoCkeditorRoutingModule } from './demo-ckeditor-routing.module';
import { DemoCkeditorComponent } from './demo-ckeditor.component';
import { CkeditorModule } from 'projects/ckeditor/src/lib/ckeditor.module';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        CkeditorModule,
        ReactiveFormsModule,
        ThemeBasicModule,
        DemoCkeditorRoutingModule,
    ],
    declarations: [
        DemoCkeditorComponent
    ]
})
export class DemoCkeditorModule { }
