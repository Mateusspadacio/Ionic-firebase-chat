import firebase from 'firebase';

export class Utils {

  static readonly maxFileSize: number = 5242880;
  static readonly emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  static timestamp(): Object {
    return firebase.database.ServerValue.TIMESTAMP;
  }

}
