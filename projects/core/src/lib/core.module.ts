import { NgModule } from '@angular/core';
import { RanCheckboxComponent } from './components/checkbox/checkbox.component';
import { RanSpinnerComponent } from './components/spinner/spinner.component';
import { RanDefaultDataPipe } from './pipes/default-data.pipe';
import { RanHtmlPipe } from './pipes/innerhtml.pipe';
import { RanJoinPipe } from './pipes/join.pipe';
import { RanMomentFormatPipe } from './pipes/moment-format.pipe';
import { RanDatePickerComponent } from './components/datepicker/datepicker.component';
import { RanAppAnchorDirective } from './directives/auchor.directive';

@NgModule({
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
        RanDefaultDataPipe,
        RanHtmlPipe,
        RanJoinPipe,
        RanMomentFormatPipe
    ],
    providers:[
        ModalService,
        UnitsService
    ]
})
export class CoreModule { }
