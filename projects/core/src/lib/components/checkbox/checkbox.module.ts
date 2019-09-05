
import { NgModule } from '@angular/core';
import { RanCheckboxComponent } from './checkbox.component';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [
        MatCheckboxModule
    ],
    declarations: [
        RanCheckboxComponent
    ],
    exports: [
        RanCheckboxComponent
    ]
})
export class RanCheckboxModule {
}
