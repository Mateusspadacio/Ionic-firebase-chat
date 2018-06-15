import { App, NavController, MenuController, AlertController } from 'ionic-angular';
import { OnInit } from "@angular/core";
import { AuthService } from './../providers/auth/auth.service';

export abstract class BaseComponent implements OnInit {

  protected navCtrl: NavController;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController,
  ) { }

  ngOnInit() {
    this.navCtrl = this.app.getActiveNavs()[0];
  }

  onLogout(): void {
    this.alertCtrl.create({
      message: "Do you want to quit?",
      buttons: [{
        text: "Yes",
        handler: () => {
          this.authService.logout().then(() => {
            this.menuCtrl.enable(false, 'menu1');
            this.navCtrl.setRoot('SigninPage');
          })
            .catch((error) => {})
        }
      },
      {
        text: "Cancel",
        role: "cancel"
      }],
      enableBackdropDismiss: false
    }).present();
  }
}
