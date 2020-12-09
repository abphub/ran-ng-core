import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultDataPipe } from './default-data.pipe';
import { HtmlPipe } from './html.pipe';
import { JoinPipe } from './join.pipe';
import { MomentFormatPipe } from './moment-format.pipe';
import { NumberToTimePipe } from './number-time.pipe';
@NgModule({
    declarations: [
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe,
        NumberToTimePipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe,
        NumberToTimePipe
    ]
})
export class PipesModule { }
