import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { MatCheckboxModule, MatDialogModule } from '@angular/material';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DefaultDataPipe } from './pipes/default-data.pipe';
import { HtmlPipe } from './pipes/innerhtml.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MomentFormatPipe } from './pipes/moment-format.pipe';
import { momentInitializer } from './units/moment-initial-utils';
import { urlInitialUtils } from './units/url-initial-utils';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputDateTimePickerComponent } from './components/input/input-datepicker-time.component';
import { InputDateRangePickerComponent } from './components/input/input-datepicker-range.component';

@NgModule({
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatDialogModule,
        ReactiveFormsModule,
        CalendarModule
    ],
    declarations: [
        CheckboxComponent,
        InputDateTimePickerComponent,
        InputDateRangePickerComponent,
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe
    ],
    exports: [
        CheckboxComponent,
        InputDateTimePickerComponent,
        InputDateRangePickerComponent,
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
