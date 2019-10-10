import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DefaultDataPipe } from './pipes/default-data.pipe';
import { HtmlPipe } from './pipes/innerhtml.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MomentFormatPipe } from './pipes/moment-format.pipe';

@NgModule({
    imports: [
        CommonModule,
        MatCheckboxModule,
    ],
    declarations: [
        CheckboxComponent,
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe
    ],
    exports: [
        CheckboxComponent,
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe
    ]
})
export class CoreModule {

}
