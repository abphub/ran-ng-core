import { NgModule } from '@angular/core';
import { RanAnchorDirective } from './auchor.directive';

@NgModule({
    declarations: [
        RanAnchorDirective
    ],
    exports: [
        RanAnchorDirective
    ]
})
export class CoreDirectivesModule { }
