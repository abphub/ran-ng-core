import { ApplicationLayoutComponent, ThemeBasicModule } from '@abp/ng.theme.basic';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CkeditorModule } from 'projects/ckeditor/src/public-api';
import { DemoCkeditorComponent } from './demo-ckeditor.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CkeditorModule,
        ThemeBasicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ApplicationLayoutComponent,
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
