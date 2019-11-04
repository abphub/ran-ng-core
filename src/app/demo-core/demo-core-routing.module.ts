import { DynamicLayoutComponent } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoCoreComponent } from './demo-core.component';

const routes: Routes = [
    {
        path: '',
        component: DynamicLayoutComponent,
        children: [{ path: '', component: DemoCoreComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoCoreRoutingModule { }
