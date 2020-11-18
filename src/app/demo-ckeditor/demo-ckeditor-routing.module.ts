import { ApplicationLayoutComponent } from '@abp/ng.theme.basic';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoCkeditorComponent } from './demo-ckeditor.component';

const routes: Routes = [
    {
        path: 'ckeditor',
        component: ApplicationLayoutComponent,
        children: [{ path: '', component: DemoCkeditorComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoCkeditorRoutingModule { }
