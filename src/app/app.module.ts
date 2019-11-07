import { AccountConfigModule } from '@abp/ng.account.config';
import { CoreModule } from '@abp/ng.core';
import { IdentityConfigModule } from '@abp/ng.identity.config';
import { SettingManagementConfigModule } from '@abp/ng.setting-management.config';
import { TenantManagementConfigModule } from '@abp/ng.tenant-management.config';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { OAuthModule } from 'angular-oauth2-oidc';
import { CoreModule as RanCoreModule } from 'projects/core/src/lib/core.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RAN_LAYOUTS, ThemeBasicModule } from 'projects/theme-basic/src/public-api';

const LOGGERS = [NgxsLoggerPluginModule.forRoot({ disabled: false })];


@NgModule({
  declarations: [AppComponent],
  imports: [
    RanCoreModule.forRoot(),
    CoreModule.forRoot({
      environment,
      requirements: {
        layouts: RAN_LAYOUTS,
      },
    }),
    ThemeBasicModule.forRoot({ theme: 'light' }),
    ThemeSharedModule.forRoot(),
    AccountConfigModule.forRoot({ redirectUrl: '/' }),
    IdentityConfigModule,
    TenantManagementConfigModule,
    SettingManagementConfigModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    OAuthModule.forRoot(),
    NgxsModule.forRoot([]),
    ...(environment.production ? [] : LOGGERS),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
