import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from './../../providers/auth/auth.service';
import { FeedBackService } from './../../providers/feedback/feed-back.service';
import { UserService } from '../../providers/user/user.service';
import { User } from './../../models/user.model';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  @ViewChild('inputPhoto') inputPhoto: ElementRef;

  @Input() currentUser: User;
  canEdit: boolean = false;
  uploadProgress: number;
  filePhoto: File;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public userService: UserService,
    public feedBackService: FeedBackService) { }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService.auth.authState
      .subscribe((authState: any) => {
        this.userService.get(authState.uid)
          .first()
          .subscribe((user: User) => {
            this.currentUser = user;
          });
      });
  }

  onSubmit(): void {

    if (this.filePhoto) {
      let uploadTask = this.userService.uploadPhoto(this.filePhoto, this.currentUser.key);

      uploadTask.on('state_changed', (snapshot) => {

        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      }, (error: Error) => {

      }, () => {
        this.editUser(uploadTask.snapshot.downloadURL);
      })
    } else {
      this.editUser();
    }

  }

  onPhoto(event): void {
    this.filePhoto = event.target.files[0];

    var reader = new FileReader();
    reader.onload = (function (aImg) { return function (e) { }; })(this.filePhoto);
    reader.readAsDataURL(this.filePhoto);
  }

  onOpenFileChooser(): void {
    this.inputPhoto.nativeElement.click();
  }

  private editUser(urlPhoto?: string): void {
    let user = {
      name: this.currentUser.name,
      username: this.currentUser.username,
      photo: urlPhoto || this.currentUser.photo || ''
    }
    this.userService.update(user)
      .then(() => {
        this.canEdit = false;
        this.currentUser.photo = user.photo;
        this.filePhoto = undefined;
        this.uploadProgress = 0;
      })
      .catch((error) => {
        this.feedBackService.showAlert(error.message);
      })
  }

}
