import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { BaseService } from '../base/base.service';

@Injectable()
export class AuthService extends BaseService {

  constructor(
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public http: HttpClient,
  ) {
      super();
  }

  createAuthUser(user: {email: string, password: string}): Promise<any> {
    return this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
    .catch(this.handlePromiseError);
  }

  signIn(user: {email: string, password: string}): Promise<any> {
    return this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
    .catch(this.handlePromiseError);
  }

  logout(): Promise<any> {
    return this.auth.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.auth.authState.subscribe((authState: any) => {
        (authState) ? resolve(true) : reject(false);
      })
    })
  }
}
