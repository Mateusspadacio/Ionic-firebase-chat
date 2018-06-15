import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SmilesTablePage } from './smiles-table';

@NgModule({
  declarations: [
    SmilesTablePage,
  ],
  imports: [
    IonicPageModule.forChild(SmilesTablePage),
  ],
})
export class SmilesTablePageModule {}
