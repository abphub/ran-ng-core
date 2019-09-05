import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationLayoutComponent } from 'projects/theme-basic/src/public-api';
import { DemoCkeditorComponent } from './demo-ckeditor.component';

const routes: Routes = [
    {
        path: '',
        component: ApplicationLayoutComponent,
        children: [{ path: '', component: DemoCkeditorComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DemoCkeditorRoutingModule { }
