import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDialogModule } from '@angular/material';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DateRangePickerComponent } from './components/datepicker/datepicker-range.component';
import { DateTimePickerComponent } from './components/datepicker/datepicker-time.component';
import { DefaultDataPipe } from './pipes/default-data.pipe';
import { HtmlPipe } from './pipes/innerhtml.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MomentFormatPipe } from './pipes/moment-format.pipe';
import { momentInitializer } from './units/moment-initial-utils';
import { urlInitialUtils } from './units/url-initial-utils';

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
        DateRangePickerComponent,
        DateTimePickerComponent,
        DefaultDataPipe,
        HtmlPipe,
        JoinPipe,
        MomentFormatPipe
    ],
    exports: [
        CheckboxComponent,
        DateRangePickerComponent,
        DateTimePickerComponent,
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
