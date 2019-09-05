import { CoreModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeBasicModule } from 'projects/theme-basic/src/public-api';
import { DemoThemeBasicRoutingModule } from './demo-theme-basic-routing.module';
import { DemoThemeBasicComponent } from './demo-theme-basic.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        ThemeBasicModule,
        DemoThemeBasicRoutingModule
    ],
    declarations: [
        DemoThemeBasicComponent
    ]
})
export class DemoThemeBasicModule { }
