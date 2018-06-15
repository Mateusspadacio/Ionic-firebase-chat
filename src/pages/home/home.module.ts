import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ComponentsModule } from './../../components/components.module';
import { HomePage } from './home';

@NgModule({
  declarations: [HomePage],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(HomePage)
  ],
  exports: [],
  providers: [],
})
export class HomeModule { }
