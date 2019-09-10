import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';
import { RanCheckboxComponent, RanDatePickerComponent, RanSpinnerComponent } from './components';
import { RanAppAnchorDirective } from './directives';
import { RanDefaultDataPipe, RanHtmlPipe, RanJoinPipe, RanMomentFormatPipe } from './pipes';
import { ModalService, UnitsService } from './services';

@NgModule({
    imports: [
        CommonModule,
        MatCheckboxModule
    ],
    declarations: [
        RanCheckboxComponent,
        RanDatePickerComponent,
        RanSpinnerComponent,
        RanAppAnchorDirective,
        RanDefaultDataPipe,
        RanHtmlPipe,
        RanJoinPipe,
        RanMomentFormatPipe
    ],
    exports: [
        RanCheckboxComponent,
        RanDatePickerComponent,
        RanSpinnerComponent,
        RanAppAnchorDirective,
        RanDefaultDataPipe,
        RanHtmlPipe,
        RanJoinPipe,
        RanMomentFormatPipe
    ],
    providers: [
        ModalService,
        UnitsService
    ]
})
export class CoreModule { }
