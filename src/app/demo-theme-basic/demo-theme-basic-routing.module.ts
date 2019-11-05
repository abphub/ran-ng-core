import { DynamicLayoutComponent } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoThemeBasicComponent } from './demo-theme-basic.component';

const routes: Routes = [
    { path: '', redirectTo: 'light', pathMatch: 'full' },
    {
        path: 'light',
        component: DynamicLayoutComponent,
        children: [
            { path: '', redirectTo: 'theme-one', pathMatch: 'full' },
            { path: 'theme-one', component: DemoThemeBasicComponent },
            { path: 'theme-two', component: DemoThemeBasicComponent },
            { path: 'theme-three', component: DemoThemeBasicComponent }
        ],
    },
    {
        path: 'dark',
        component: DynamicLayoutComponent,
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
