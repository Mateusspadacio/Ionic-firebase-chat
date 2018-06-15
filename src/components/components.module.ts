import { PipesModule } from './../pipes/pipes.module';
import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { InputMessageComponent } from './input-message/input-message.component';
@NgModule({
	declarations: [CustomHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent,
    InputMessageComponent],
	imports: [
    IonicModule,
    PipesModule
  ],
	exports: [CustomHeaderComponent,
    MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent,
    ProgressBarComponent,
    InputMessageComponent]
})
export class ComponentsModule {}
