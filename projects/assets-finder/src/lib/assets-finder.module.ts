import { NgModule } from '@angular/core';
import { AssetsFinderComponent } from './components/assets-finder.component';
import { AssetsFilesComponent } from './components/assets-files/assets-files.component';
import { AssetsFoldersComponent } from './components/assets-folders/assets-folders.component';


@NgModule({
  imports: [],
  declarations: [
    AssetsFilesComponent,
    AssetsFoldersComponent,
    AssetsFinderComponent
  ],
  exports: [AssetsFinderComponent]
})
export class AssetsFinderModule { }
