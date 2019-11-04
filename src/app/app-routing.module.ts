import { ACCOUNT_ROUTES } from '@abp/ng.account';
import { ABP, eLayoutType } from '@abp/ng.core';
import { IDENTITY_ROUTES } from '@abp/ng.identity';
import { TENANT_MANAGEMENT_ROUTES } from '@abp/ng.tenant-management';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { THEME_BASIC_ROUTES } from 'projects/theme-basic/src/public-api';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: {
      routes: {
        name: '::Menu:Home',
      } as ABP.Route,
    },
  },
  {
    path: 'ckeditor',
    loadChildren: () => import('./demo-ckeditor/demo-ckeditor.module').then(m => m.DemoCkeditorModule),
    data: {
      routes: {
        name: '::Menu:Ckeditor',
        layout: eLayoutType.application,
      } as ABP.FullRoute,
    },
  },
  {
    path: 'core',
    loadChildren: () => import('./demo-core/demo-core.module').then(m => m.DemoCoreModule),
    data: {
      routes: {
        name: '::Menu:Core',
        layout: eLayoutType.application,
      } as ABP.FullRoute,
    },
  },
  {
    path: 'theme',
    loadChildren: () => import('./demo-theme-basic/demo-theme-basic.module').then(m => m.DemoThemeBasicModule),
    data: { routes: THEME_BASIC_ROUTES },
  },
  {
    path: 'account',
    loadChildren: () => import('./lazy-libs/account-wrapper.module').then(m => m.AccountWrapperModule),
    data: { routes: ACCOUNT_ROUTES },
  },
  {
    path: 'identity',
    loadChildren: () => import('./lazy-libs/identity-wrapper.module').then(m => m.IdentityWrapperModule),
    data: { routes: IDENTITY_ROUTES },
  },
  {
    path: 'tenant-management',
    loadChildren: () =>
      import('./lazy-libs/tenant-management-wrapper.module').then(m => m.TenantManagementWrapperModule),
    data: { routes: TENANT_MANAGEMENT_ROUTES },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
