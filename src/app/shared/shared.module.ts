import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ThemeBasicModule } from '@abp/ng.theme.basic';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    ThemeSharedModule,
    ThemeBasicModule,
    NgbDropdownModule
  ],
  exports: [
    CoreModule,
    ThemeBasicModule,
    ThemeSharedModule,
    NgbDropdownModule
  ],
  providers: [],
})
export class SharedModule { }
