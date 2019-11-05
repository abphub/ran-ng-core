import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatBadgeModule, MatButtonModule, MatListModule,
    MatMenuModule, MatSidenavModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { Router, RouterEvent } from '@angular/router';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { NgxsModule } from '@ngxs/store';
import { CoreModule as RanCoreModule } from '@ran-ng/core';
import { SpinnerModule } from '@ran-ng/spinner';
import { AccountLayoutComponent } from './components/account-layout.component';
import { ApplicationLayoutComponent } from './components/application-layout.component';
import { AppDrawerComponent } from './components/drawer/drawer.component';
import { EmptyLayoutComponent } from './components/empty-layout.component';
import { AppHeaderBarComponent } from './components/header/headerbar.component';
import { AppHeaderComponent } from './components/header/header.component';
import { PageContentComponent } from './components/page/page-content.component';
import { PageHeaderComponent } from './components/page/page-header.component';
import { PageSidebarComponent } from './components/page/page-sidebar.component';
import { PageTableComponent } from './components/page/page-table.component';
import { AppSidebarComponent } from './components/sidebar/sidebar.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { AppNavgationService } from './services/navigation.service';
import { RanLayoutState } from './states/layout.state';
import { RanNavigationState } from './states/navigation.state';
import { AppbarComponent } from './components/appbar/appbar.component';
import { PageTopToolsComponent } from './components/page/page-top-tools.component';

export const RAN_LAYOUTS = [ApplicationLayoutComponent, AccountLayoutComponent, EmptyLayoutComponent];

@NgModule({
    declarations: [
        ...RAN_LAYOUTS,
        AppbarComponent,
        AppHeaderComponent,
        AppHeaderBarComponent,
        AppSidebarComponent,
        AppDrawerComponent,
        PageHeaderComponent,
        PageSidebarComponent,
        PageContentComponent,
        PageTableComponent,
        PageTopToolsComponent,
        ValidationErrorComponent
    ],
    imports: [
        NgxsModule.forFeature([RanLayoutState, RanNavigationState]),
        CoreModule,
        RanCoreModule,
        SpinnerModule,
        ThemeSharedModule,
        CommonModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatBadgeModule,
        MatButtonModule,
        MatMenuModule,
        MatTooltipModule,
        NgxValidateCoreModule,
        NgxValidateCoreModule.forRoot({
            targetSelector: '.form-group',
            blueprints: {
                email: 'AbpAccount::ThisFieldIsNotAValidEmailAddress.',
                max: 'AbpAccount::ThisFieldMustBeBetween{0}And{1}[{{ min }},{{ max }}]',
                maxlength: 'AbpAccount::ThisFieldMustBeAStringWithAMaximumLengthOf{1}[{{ requiredLength }}]',
                min: 'AbpAccount::ThisFieldMustBeBetween{0}And{1}[{{ min }},{{ max }}]',
                minlength: 'AbpAccount::ThisFieldMustBeAStringOrArrayTypeWithAMinimumLengthOf[{{ min }},{{ max }}]',
                required: 'AbpAccount::ThisFieldIsRequired.',
                passwordMismatch: 'AbpIdentity::Identity.PasswordConfirmationFailed',
            },
            errorTemplate: ValidationErrorComponent,
        }),
    ],
    exports: [
        ...RAN_LAYOUTS,
        PageHeaderComponent,
        PageSidebarComponent,
        PageContentComponent,
        PageTableComponent,
        PageTopToolsComponent
    ],
    entryComponents: [
        ...RAN_LAYOUTS,
        ValidationErrorComponent
    ],
    providers: [
        AppNavgationService
    ]
})
export class ThemeBasicModule {
    constructor(
        router: Router,
        appNavgationService: AppNavgationService,
    ) {
        router.events.subscribe((event: RouterEvent) => {
            appNavgationService.setNavigations(event);
        });
    }
}
