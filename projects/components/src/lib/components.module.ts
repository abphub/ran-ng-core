import { NgModule } from '@angular/core';
import { PipesModule } from './pipes/pipe.module';

@NgModule({
  imports: [
    PipesModule
  ],
  exports: [
    PipesModule
  ]
})
export class ComponentsModule { }
