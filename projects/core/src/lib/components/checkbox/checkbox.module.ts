
import { NgModule } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
    imports: [
        MatCheckboxModule
    ],
    declarations: [
        CheckboxComponent
    ],
    exports: [
        CheckboxComponent
    ]
})
export class CheckboxModule {
}
