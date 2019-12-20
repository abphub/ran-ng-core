import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { ThemeBasicModule } from 'projects/theme-basic/src/public-api';
import { MatMenuModule } from '@angular/material';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CoreModule, ThemeSharedModule, ThemeBasicModule,
    MatMenuModule,
    HomeRoutingModule,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
