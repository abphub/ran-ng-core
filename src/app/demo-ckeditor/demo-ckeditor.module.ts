import { CoreModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoCkeditorRoutingModule } from './demo-ckeditor-routing.module';
import { DemoCkeditorComponent } from './demo-ckeditor.component';
import { CkeditorModule } from 'projects/ckeditor/src/lib/ckeditor.module';
import { ThemeBasicModule } from '@abp/ng.theme.basic';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        CkeditorModule,
        ThemeBasicModule,
        ReactiveFormsModule,
        DemoCkeditorRoutingModule,
    ],
    declarations: [
        DemoCkeditorComponent
    ]
})
export class DemoCkeditorModule { }
