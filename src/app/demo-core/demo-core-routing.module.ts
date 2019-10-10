import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationLayoutComponent } from 'projects/theme-basic/src/public-api';
import { DemoCoreComponent } from './demo-core.component';

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
