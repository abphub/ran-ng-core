import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ApplicationLayoutComponent } from 'projects/theme-basic/src/public-api';
import { PermissionGuard, AuthGuard } from '@abp/ng.core';

const routes: Routes = [
  {
    canActivate: [AuthGuard, PermissionGuard],
    path: '',
    component: ApplicationLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
