import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BaseService } from '../base/base.service';
import { Message } from './../../models/message.model';
import { FirebaseApp } from 'angularfire2';


@Injectable()
export class MessageService extends BaseService {

  private readonly path: string = "/messages";

  constructor(
    public db: AngularFireDatabase,
    @Inject(FirebaseApp) public firebaseApp: any,
    public http: HttpClient
  ) {
    super();
  }

  getMessages(userId1: string, userId2: string, limit: number): AngularFireList<Message> {
    return this.db.list(`${this.path}/${userId1}-${userId2}`,
    ref => ref.orderByChild('timestamp').limitToLast(limit));

  }

  create(message: Message, listMessages: AngularFireList<Message>): PromiseLike<any> {
    return listMessages.push(message);
  }

  uploadAttachment(attachment: File): any {
    return this.firebaseApp.storage()
      .ref()
      .child(`/attachments/${Math.random()}*Name:${attachment.name}:EndName*`)
      .put(attachment);
  }

}
