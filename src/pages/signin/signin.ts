import { FeedBackService } from './../../providers/feedback/feed-back.service';
import { AuthService } from './../../providers/auth/auth.service';
import { Utils } from './../../utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  signinForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public feedBackService: FeedBackService,
    public menuCtrl: MenuController) {
      this.menuCtrl.enable(false, 'menu1');
      this.initForm();
  }


  onSubmit(): void {
    let loading = this.feedBackService.showLoading();
    this.authService.signIn(this.signinForm.value)
    .then((response: any) => {
      loading.dismiss();
      this.navCtrl.setRoot('HomePage');
    })
    .catch((error: any) => {
      loading.dismiss();
      this.feedBackService.showAlert(error);
    })
  }

  onSignup(): void {
    this.navCtrl.push('SignupPage');
  }

  private initForm(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Utils.emailRegex)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]]
    });
  }
}
