import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { BaseService } from '../base/base.service';
import { User } from '../../models/user.model';

import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';

@Injectable()
export class UserService extends BaseService {

  users: Observable<User[]>;
  currentUser: AngularFireObject<User>;
  private readonly path = '/users';

  constructor(
    public auth: AngularFireAuth,
    @Inject(FirebaseApp) public firebaseApp: any,
    public http: HttpClient,
    public db: AngularFireDatabase) {
    super();
    this.listenAuthState();
  }

  create(user: User): Promise<void> {
    return this.db.object(`${this.path}/${user.key}`).set(this.deleteUid(user))
      .catch(this.handlePromiseError);
  }

  userExists(username: string): Observable<boolean> {
    return this.db.list(this.path, ref => ref.orderByChild('username').equalTo(username)).valueChanges()
      .map((users: User[]) => {
        return users.length > 0;
      })
  }

  update(user: {name: string, username: string; photo: string}): Promise<void> {
    return this.currentUser.update(user)
    .catch(this.handlePromiseError);
  }

  get(userId: string): Observable<User> {
    return this.mapObjectKey(this.db.object(`${this.path}/${userId}`))
    .catch(this.handleObservableError);
  }

  uploadPhoto(file: File, userId: string): any {
    return this.firebaseApp
    .storage()
    .ref()
    .child(`${this.path}/${userId}`)
    .put(file)
  }

  private deleteUid(user: User): User {
    delete user.key;
    return user;
  }

  private setUsers(uidToExclude: string): void {
    this.users = this.mapListKeys<User>(
      this.db.list<User>(this.path,
        (ref: firebase.database.Reference) => ref.orderByChild('name')
      )
    )
      .map((users: User[]) => {
        return users.filter((user: User) => user.key !== uidToExclude);
      });
  }

  private listenAuthState(): void {
    this.auth.authState.subscribe((authState) => {
      if (authState) {
        this.currentUser = this.db.object(`${this.path}/${authState.uid}`)
        this.setUsers(authState.uid);
      }
    });
  }

}
