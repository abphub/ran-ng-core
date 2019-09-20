import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';
import { RanCheckboxComponent } from './components/checkbox/checkbox.component';
import { RanSpinnerComponent } from './components/spinner/spinner.component';
import { RanAppAnchorDirective } from './directives/auchor.directive';
import { RanDefaultDataPipe } from './pipes/default-data.pipe';
import { RanHtmlPipe } from './pipes/innerhtml.pipe';
import { RanJoinPipe } from './pipes/join.pipe';
import { RanMomentFormatPipe } from './pipes/moment-format.pipe';
import { ModalService } from './services/modal.service';
import { UnitsService } from './services/units.service';

@NgModule({
    imports: [
        CommonModule,
        MatCheckboxModule
    ],
    declarations: [
        RanCheckboxComponent,
        RanSpinnerComponent,
        RanAppAnchorDirective,
        RanDefaultDataPipe,
        RanHtmlPipe,
        RanJoinPipe,
        RanMomentFormatPipe
    ],
    exports: [
        RanCheckboxComponent,
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
