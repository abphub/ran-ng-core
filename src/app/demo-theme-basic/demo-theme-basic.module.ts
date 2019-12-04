import { CoreModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoThemeBasicRoutingModule } from './demo-theme-basic-routing.module';
import { DemoThemeBasicComponent } from './demo-theme-basic.component';
import { MatListModule, MatTableModule } from '@angular/material';
import { ThemeBasicModule } from 'projects/theme-basic/src/public-api';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        ThemeBasicModule,
        DemoThemeBasicRoutingModule,
        MatListModule,
        MatTableModule
    ],
    declarations: [
        DemoThemeBasicComponent
    ]
})
export class DemoThemeBasicModule { }
