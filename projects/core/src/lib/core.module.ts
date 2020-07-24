import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgForEndDirective } from './directives/ng-for-of-end.direcitve';
import { DefaultDataPipe } from './pipes/default-data.pipe';
import { HtmlPipe } from './pipes/innerhtml.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MomentFormatPipe } from './pipes/moment-format.pipe';
import { NumberToTimePipe } from './pipes/number-time.pipe';
import { momentInitializer } from './units/moment-initial-utils';
import { urlInitialUtils } from './units/url-initial-utils';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe,
        NumberToTimePipe,
        NgForEndDirective
    ],
    exports: [
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe,
        NumberToTimePipe,
        NgForEndDirective
    ]
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    deps: [Injector],
                    useFactory: momentInitializer,
                },
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    deps: [Injector],
                    useFactory: urlInitialUtils,
                }
            ]
        }
    }
}
