import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { AppAnchorDirective } from './directives/auchor.directive';
import { DefaultDataPipe } from './pipes/default-data.pipe';
import { HtmlPipe } from './pipes/innerhtml.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MomentFormatPipe } from './pipes/moment-format.pipe';
import { ModalService } from './services/modal.service';
import { UnitsService } from './services/units.service';

@NgModule({
    imports: [
        CommonModule,
        MatCheckboxModule
    ],
    declarations: [
        CheckboxComponent,
        AppAnchorDirective,
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe
    ],
    exports: [
        CheckboxComponent,
        AppAnchorDirective,
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                ModalService,
                UnitsService
            ]
        };
    }
}
