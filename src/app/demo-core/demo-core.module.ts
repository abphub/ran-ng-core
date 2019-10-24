import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CoreModule } from 'projects/core/src/public-api';
import { ThemeBasicModule } from 'projects/theme-basic/src/public-api';
import { DemoCoreRoutingModule } from './demo-core-routing.module';
import { DemoCoreComponent } from './demo-core.component';


@NgModule({
    declarations: [
        DemoCoreComponent,
    ],
    imports: [
        NgxValidateCoreModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ThemeBasicModule,
        DemoCoreRoutingModule
    ]
})
export class DemoCoreModule { }
