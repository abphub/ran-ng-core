import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgForEndDirective } from './directives/ng-for-of-end.direcitve';
import { Abpone } from './models/abpone';
import { DefaultDataPipe } from './pipes/default-data.pipe';
import { HtmlPipe } from './pipes/html.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MomentFormatPipe } from './pipes/moment-format.pipe';
import { NumberToTimePipe } from './pipes/number-time.pipe';
import { AbponeState } from './states/abpone.state';
import { ABPONE_CORE_OPTIONS, coreOptionsFactory } from './tokens/abpone.token';
import { abponeUtils } from './utils/abpone-utils';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([AbponeState]),
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
    static forRoot(options: Abpone.Root = {} as Abpone.Root): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: 'ABPONE_CORE_OPTIONS',
                    useValue: options
                },
                {
                    provide: ABPONE_CORE_OPTIONS,
                    useFactory: coreOptionsFactory,
                    deps: ['ABPONE_CORE_OPTIONS']
                },
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    deps: [Injector],
                    useFactory: abponeUtils,
                }
            ]
        }
    }
}
