import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationLayoutComponent } from 'projects/theme-basic/src/public-api';
import { DemoThemeBasicComponent } from './demo-theme-basic.component';

const routes: Routes = [
    {
        path: '',
        component: ApplicationLayoutComponent,
        children: [{ path: '', component: DemoThemeBasicComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoThemeBasicRoutingModule { }
