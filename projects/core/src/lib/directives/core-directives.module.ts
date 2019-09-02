import { NgModule } from '@angular/core';
import { AnchorDirective } from './auchor.directive';

@NgModule({
    declarations: [
        AnchorDirective
    ],
    exports: [
        AnchorDirective
    ]
})
export class CoreDirectivesModule { }
