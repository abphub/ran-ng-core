import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationLayoutComponent } from 'projects/theme-basic/src/public-api';
import { DemoThemeBasicComponent } from './demo-theme-basic.component';

const routes: Routes = [
    { path: '', redirectTo: 'light', pathMatch: 'full' },
    {
        path: 'light',
        component: ApplicationLayoutComponent,
        children: [
            { path: '', redirectTo: 'theme-one', pathMatch: 'full' },
            { path: 'theme-one', component: DemoThemeBasicComponent },
            { path: 'theme-two', component: DemoThemeBasicComponent },
            { path: 'theme-three', component: DemoThemeBasicComponent }
        ],
    },
    {
        path: 'dark',
        component: ApplicationLayoutComponent,
        children: [
            { path: '', redirectTo: 'theme-one', pathMatch: 'full' },
            { path: 'theme-one', component: DemoThemeBasicComponent },
            { path: 'theme-two', component: DemoThemeBasicComponent },
            { path: 'theme-three', component: DemoThemeBasicComponent }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoThemeBasicRoutingModule { }
