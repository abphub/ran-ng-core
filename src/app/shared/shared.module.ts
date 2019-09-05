import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { TableModule } from 'primeng/table';
import { ThemeBasicModule } from 'projects/theme-basic/src/public-api';

@NgModule({
  declarations: [],
  imports: [CoreModule, ThemeSharedModule, ThemeBasicModule, TableModule, NgbDropdownModule],
  exports: [CoreModule, ThemeSharedModule, ThemeBasicModule, TableModule, NgbDropdownModule],
  providers: [],
})
export class SharedModule {}
