import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, APP_INITIALIZER, Injector } from '@angular/core';
import { MatCheckboxModule } from '@angular/material';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DefaultDataPipe } from './pipes/default-data.pipe';
import { HtmlPipe } from './pipes/innerhtml.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MomentFormatPipe } from './pipes/moment-format.pipe';
import { momentLocaleInitializer } from './units/initial-utils';

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
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    deps: [Injector],
                    useFactory: momentLocaleInitializer,
                },
            ]
        }
    }
}
