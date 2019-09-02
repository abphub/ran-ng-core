import { NgModule } from '@angular/core';
import { DefaultDataPipe } from './default-data.pipe';
import { HtmlPipe } from './innerhtml.pipe';
import { JoinPipe } from './join.pipe';
import { MomentFormatPipe } from './moment-format.pipe';

@NgModule({
    declarations: [
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe
    ],
    exports: [
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe
    ]
})
export class CorePipesModule { }
