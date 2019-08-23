
import { NgModule } from '@angular/core';
import { Ckeditor5Component } from './components/ckeditor5/ckeditor5.component';

@NgModule({
  declarations: [
    Ckeditor5Component
  ],
  exports: [
    Ckeditor5Component
  ]
})
export class CkeditorModule {
}
