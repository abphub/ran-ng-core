import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import {
  MatMenuModule,
  MatSidenavModule, MatListModule, MatToolbarModule, MatBadgeModule, MatButtonModule, MatTooltipModule
} from '@angular/material';
import { ThemeBasicModule } from '@ran-ng/theme-basic';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home.component';
import { AppHeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '@ran-ng/spinner';
import { CoreModule as RanCoreModule } from '@ran-ng/core';

@NgModule({
  declarations: [HomeComponent, AppHeaderComponent],
  imports: [
    CoreModule,
    RanCoreModule,
    ThemeSharedModule,
    CommonModule,
    ThemeBasicModule,
    HomeRoutingModule,
    SpinnerModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule { }
