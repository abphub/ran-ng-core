import { CoreModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreDirectivesModule, RanCkeditor5Module } from '@ran-ng/core';
import { ThemeBasicModule } from 'projects/theme-basic/src/public-api';
import { DemoCkeditorRoutingModule } from './demo-ckeditor-routing.module';
import { DemoCkeditorComponent } from './demo-ckeditor.component';

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        ReactiveFormsModule,
        ThemeBasicModule,
        DemoCkeditorRoutingModule,
        CoreDirectivesModule,
        RanCkeditor5Module,
    ],
    declarations: [
        DemoCkeditorComponent
    ]
})
export class DemoCkeditorModule { }
