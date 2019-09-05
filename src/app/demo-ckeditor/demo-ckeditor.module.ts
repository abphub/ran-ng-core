import { CoreModule, DynamicLayoutComponent } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreDirectivesModule, RanCkeditor5Module } from '@ran-ng/core';
import { DemoCkeditorComponent } from './demo-ckeditor.component';

@NgModule({
    imports: [
        CoreDirectivesModule,
        RanCkeditor5Module,
        CoreModule,
        CommonModule,
        ReactiveFormsModule,
        ThemeSharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: DynamicLayoutComponent,
                children: [{ path: '', component: DemoCkeditorComponent }],
            }
        ]),
    ],
    declarations: [
        DemoCkeditorComponent
    ],
    exports: [
        RouterModule
    ]
})
export class DemoCkeditorModule { }
