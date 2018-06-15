import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { Chat } from '../../models/chat.model';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ChatService extends BaseService {

  private readonly path: string = '/chats';

  chats: AngularFireList<Chat>;

  constructor(
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public http: HttpClient
  ) {
    super();
    this.setChats();
  }

  private setChats(): void {
    this.auth.authState
      .subscribe((authState: any) => {
        if (authState) {
          this.chats = this.db.list<Chat>(`${this.path}/${authState.uid}`,
            ref => ref.orderByChild('timestamp'));
        }
      });
  }

  create(chat: Chat, userId1: string, userId2: string): Promise<void> {
    return this.db.object(`${this.path}/${userId1}/${userId2}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

  getDeepChat(userId1: string, userId2: string): AngularFireObject<Chat> {
    return this.db.object(`${this.path}/${userId1}/${userId2}`);
  }

  updatePhoto(chat: AngularFireObject<Chat>, chatPhoto: string, recipientUserPhoto: string): Promise<void> {
    if (chatPhoto != recipientUserPhoto) {
      return chat.update({
        photo: recipientUserPhoto
      })
      .catch(this.handlePromiseError);
    }
    return Promise.resolve();
  }

}
