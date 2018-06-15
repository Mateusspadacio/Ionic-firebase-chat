import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { User } from '../models/user.model';
import { AuthService } from './../providers/auth/auth.service';
import { UserService } from './../providers/user/user.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'SigninPage';

  currentUser: User;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    userService: UserService,
    authService: AuthService) {

    authService.auth.authState
      .subscribe((authState: any) => {
        if (authState) {
          userService.get(authState.uid)
            .subscribe((user: User) => {
              this.currentUser = user;
            });
        }
      });



    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

