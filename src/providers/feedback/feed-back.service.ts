import { Injectable } from '@angular/core';
import { Loading, LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class FeedBackService {

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }


  showLoading(): Loading {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  showAlert(message: string): void {
    this.alertCtrl.create({
      title: 'System message!',
      message: message,
      buttons: ['Ok'],
      enableBackdropDismiss: false
    }).present();
  }


}
