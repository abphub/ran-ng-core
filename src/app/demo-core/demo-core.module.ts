import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'projects/core/src/public-api';
import { DemoCoreRoutingModule } from './demo-core-routing.module';
import { DemoCoreComponent } from './demo-core.component';
import { ThemeBasicModule } from 'projects/theme-basic/src/public-api';


@NgModule({
    declarations: [
        DemoCoreComponent,
    ],
    imports: [
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        ThemeBasicModule,
        CommonModule,
        DemoCoreRoutingModule
    ]
})
export class DemoCoreModule { }
