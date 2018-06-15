import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/first';

import { AuthService } from '../../providers/auth/auth.service';
import { FeedBackService } from './../../providers/feedback/feed-back.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user/user.service';
import { Utils } from './../../utils/utils';


@IonicPage({
  defaultHistory: ['SigninPage']
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild('inputImage') inputImage: ElementRef;

  signupForm: FormGroup;
  userPhoto: File;
  userPhotoPath: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public authService: AuthService,
    public feedBackService: FeedBackService) {
    this.initFormGroup();
  }

  initFormGroup(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.pattern(Utils.emailRegex)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]]
    });
  }

  signUp(): void {
    let loading: Loading = this.feedBackService.showLoading();
    let v = this.signupForm.value;

    let user: User = new User(v.name, v.username, v.email, '');

    this.userService.userExists(v.username)
      .first()
      .subscribe((usernameExists: boolean) => {

        if (!usernameExists) {
          this.authService.createAuthUser({
            email: v.email,
            password: v.password
          })
            .then((authState: any) => {
              user.key = authState.uid;

              this.userService.uploadPhoto(this.userPhoto, user.key)
                .then((snapshot) => {
                  user.photo = snapshot.downloadURL;
                  console.log(user);
                  this.userService.create(user)
                    .then(() => {
                      loading.dismiss();
                      this.navCtrl.setRoot('HomePage');
                    })
                    .catch((error) => {
                      loading.dismiss();
                      this.feedBackService.showAlert(error);
                    });
                });
            })
            .catch((error) => {
              loading.dismiss();
              this.feedBackService.showAlert(error);
            });
        } else {
          loading.dismiss();
          this.feedBackService.showAlert(`Username ${v.username} has been used! Please, choose another`);
        }

      },
        (error) => {
          loading.dismiss();
        });
  }

  onInputPhoto(event): void {
    this.userPhoto = event.target.files[0];
    if (!this.userPhoto) {
      return;
    }
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.userPhotoPath = event.target.result;
    }
    reader.readAsDataURL(this.userPhoto);
  }

  openGallery(): void {
    this.inputImage.nativeElement.click();
  }

}
