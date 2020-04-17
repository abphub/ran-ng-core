import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoCkeditorComponent } from './demo-ckeditor.component';
import { DynamicLayoutComponent } from '@abp/ng.core';

const routes: Routes = [
    {
        path: 'ckeditor',
        component: DynamicLayoutComponent,
        children: [{ path: '', component: DemoCkeditorComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoCkeditorRoutingModule { }
