import { CoreModule, DynamicLayoutComponent } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoThemeBasicComponent } from './demo-theme-basic.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        RouterModule.forChild([
            {
                path: '',
                component: DynamicLayoutComponent,
                children: [{ path: '', component: DemoThemeBasicComponent }],
            }
        ]),
    ],
    declarations: [
        DemoThemeBasicComponent
    ],
    exports: [
        RouterModule
    ]
})
export class DemoThemeBasicModule { }
