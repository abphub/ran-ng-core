import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { PermissionGuard, AuthGuard } from '@abp/ng.core';
import { EmptyLayoutComponent } from '@ran-ng/theme-basic';

const routes: Routes = [
  {
    // canActivate: [AuthGuard, PermissionGuard],
    path: '',
    component: EmptyLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
