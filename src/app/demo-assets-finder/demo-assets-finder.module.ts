import { ApplicationLayoutComponent, ThemeBasicModule } from '@abp/ng.theme.basic';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AssetsFinderModule } from 'projects/assets-finder/src/public-api';
import { DemoAssetsFinderComponent } from './demo-assets-finder.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AssetsFinderModule,
        ThemeBasicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ApplicationLayoutComponent,
                children: [{ path: '', component: DemoAssetsFinderComponent }],
            }
        ]),
    ],
    declarations: [
        DemoAssetsFinderComponent
    ],
    exports: [
        RouterModule
    ]
})
export class DemoAssetsFinderModule { }
