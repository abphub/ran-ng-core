import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoCoreComponent } from './demo-core.component';
import { ApplicationLayoutComponent } from '@abp/ng.theme.basic';

const routes: Routes = [
    {
        path: '',
        component: ApplicationLayoutComponent,
        children: [{ path: '', component: DemoCoreComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoCoreRoutingModule { }
