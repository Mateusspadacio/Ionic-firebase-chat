import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, PopoverController } from 'ionic-angular';
import { AngularFireList, AngularFireObject } from 'angularfire2/database';

import { FeedBackService } from './../../providers/feedback/feed-back.service';
import { ChatService } from './../../providers/chat/chat.service';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';
import { Chat } from '../../models/chat.model';
import { Utils } from './../../utils/utils';
import { Message } from './../../models/message.model';
import { MessageService } from './../../providers/message/message.service';
import { SmileModel } from '../../models/smiles.model';

import 'rxjs/add/operator/first'
import { Observable, Subscription } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('inputMsg') inputMsg: any;

  viewMessages: Observable<Message[]>;
  messages: AngularFireList<Message>;
  subscriptionMessage: Subscription;
  pageTitle: string;
  sender: User;
  recipient: User;
  limit: number = 5;
  isLoading: boolean = false;
  messagesLength: number = 0;
  offSet: number = 5;
  files: File[] = [];
  indexFile: number = 0;
  smile: SmileModel;

  private chat1: AngularFireObject<Chat>;
  private chat2: AngularFireObject<Chat>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthService,
    public chatService: ChatService,
    public userService: UserService,
    public messageService: MessageService,
    public popoverCtrl: PopoverController,
    public feedBackService: FeedBackService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');

    if (!this.recipient) {
      this.navCtrl.setRoot('HomePage');
      return;
    }

    this.userService.mapObjectKey(this.userService.currentUser)
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;
        this.chat1 = this.chatService.getDeepChat(this.sender.key, this.recipient.key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.key, this.sender.key);

        if (this.recipient.photo) {
          this.chat1.valueChanges()
            .first()
            .subscribe((chat: Chat) => {
              this.chatService.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
            });
        }
        this.getMessages();
        this.waitForMessages();
      },
        error => { });
  }

  waitForMessages(): void {
    setTimeout(() => {
      if (this.messagesLength == 0) {
        this.waitForMessages();
      } else {
        this.scrollToBottom();
      }
    }, 50);
  }

  sendMessage(): void {
    let text = this.inputMsg.text;

    if (!text) {
      return;
    }

    let message: Message = new Message(this.sender.key, text, Utils.timestamp(), []);
    this.inputMsg.clear();
    if (this.files.length > 0) {
      this.uploadAttachments(message);
    } else {
      this.createMessage(message);
    }

  }

  openInput(): void {
    this.inputFile.nativeElement.click();
  }

  onAttachment(event): void {
    let file: File = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.size > Utils.maxFileSize) {
      this.feedBackService.showAlert("The file must be less than 5 mb");
      return;
    }

    this.files.push(event.target.files[0]);
  }

  removeFile(file: File): void {
    let index = this.files.indexOf(file);

    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  onLoading() {
    this.isLoading = true;
    this.limit += this.offSet;
    this.getMessages();
  }

  openSmiles(event) {
    let popover = this.popoverCtrl.create('SmilesTablePage');
    popover.present({
      ev: event
    });
    popover.onDidDismiss(smile => {
      this.smile = smile;
    })
  }

  private uploadAttachments(message: Message): void {

    if (this.indexFile == this.files.length) {
      this.createMessage(message);
      this.indexFile = 0;
      this.files = [];
      return;
    }

    this.messageService.uploadAttachment(this.files[this.indexFile])
      .then((snapshot) => {
        message.attachment.push(snapshot.downloadURL);
        ++this.indexFile;
        this.uploadAttachments(message);
      })

  }

  private scrollToBottom(duration: number = 300): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(duration);
      }
    }, 50);
  }

  private createMessage(message: Message): void {
    this.messageService.create(message, this.messages)
      .then(() => {
        this.chat1
          .update({
            lastMessage: message.text,
            timestamp: Utils.timestamp()
          });

        this.chat2
          .update({
            lastMessage: message.text,
            timestamp: Utils.timestamp()
          });
        this.scrollToBottom(0);
      });
  }

  private getMessages(): void {
    this.messages = this.messageService
      .getMessages(this.sender.key, this.recipient.key, this.limit);

    let subscription = () => {
      this.viewMessages = this.messageService.mapListKeys<Message>(this.messages);
      this.subscriptionMessage = this.viewMessages
        .subscribe((messages: Message[]) => {
          this.messagesLength = messages.length;
          this.isLoading = false;
        });
    }

    this.messageService.mapListKeys(this.messages)
      .first()
      .subscribe((messages: Message[]) => {

        if (messages.length === 0) {
          this.messages = this.messageService
            .getMessages(this.recipient.key, this.sender.key, this.limit);
          this.messageService.mapListKeys(this.messages)
          subscription();
        } else {
          subscription();
        }

      });
  }

  ionViewDidLeave(){
    if (this.subscriptionMessage) {
      this.subscriptionMessage.unsubscribe();
    }
  }

}
