import { NgModule } from '@angular/core';
import { SpinnerModule } from '@ran-ng/spinner';
import { Ckeditor5ToolbarComponent } from './components/ckeditor5-toolbar.component';
import { Ckeditor5Component } from './components/ckeditor5.component';


@NgModule({
  imports: [
    SpinnerModule,
  ],
  declarations: [
    Ckeditor5ToolbarComponent,
    Ckeditor5Component
  ],
  exports: [
    Ckeditor5ToolbarComponent,
    Ckeditor5Component
  ]
})
export class CkeditorModule { }
