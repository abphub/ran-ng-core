import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from 'projects/core/src/public-api';
import { ThemeBasicModule } from 'projects/theme-basic/src/public-api';
import { DemoCoreRoutingModule } from './demo-core-routing.module';
import { DemoCoreComponent } from './demo-core.component';
import { MatDialogModule } from '@angular/material';


@NgModule({
    declarations: [
        DemoCoreComponent,
    ],
    imports: [
        CoreModule,
        MatDialogModule,
        CommonModule,
        ThemeBasicModule,
        DemoCoreRoutingModule
    ]
})
export class DemoCoreModule { }
