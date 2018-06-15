import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/first';
import { AuthService } from '../../providers/auth/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user/user.service';
import { ChatService } from './../../providers/chat/chat.service';
import { Chat } from '../../models/chat.model';
import { Utils } from './../../utils/utils';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  view: string = 'chats';
  warningMessage: string = '';
  users: Observable<User[]>
  chats: Observable<Chat[]>

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public chatService: ChatService,
    public authService: AuthService,
    public userService: UserService,
    public menuCtrl: MenuController) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'menu1');
    this.loadingData();
  }

  onChatCreate(userRecipient: User): void {

    this.userService.mapObjectKey(this.userService.currentUser)
      .first()
      .subscribe((currentUser: User) => {

        this.userService.mapObjectKey(this.chatService.getDeepChat(currentUser.key, userRecipient.key))
          .first()
          .subscribe((chat: Chat) => {
            if (!chat.key) {
              let chat1: Chat = new Chat(
                '',
                Utils.timestamp(),
                userRecipient.name,
                userRecipient.photo
              );

              let chat2: Chat = new Chat(
                '',
                Utils.timestamp(),
                currentUser.name,
                currentUser.photo
              );

              this.chatService.create(chat1, currentUser.key, userRecipient.key);
              this.chatService.create(chat2, userRecipient.key, currentUser.key);
            }
          })
      });

    this.navCtrl.push('ChatPage', {
      recipientUser: userRecipient
    });
  }

  onChatOpen(chat: Chat): void {
    let userRecipient = chat.key;

    this.userService.get(userRecipient)
      .first()
      .subscribe((user: User) => {
        this.navCtrl.push('ChatPage', {
          recipientUser: user
        });
      });
  }

  filterItems(event: any): void {
    let searchTerm: string = event.target.value;

    this.loadingData();

    if (!searchTerm) {
      return;
    }

    switch (this.view) {
      case 'chats':
        this.chats = this.chats.map((chats: Chat[]) => {
          let chatsFiltered: Chat[] = chats.filter((chat: Chat) => {
            return (chat.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          });

          this.warningMessage = chatsFiltered.length == 0 ? 'No chats were found' : '';

          return chatsFiltered;
        });


        break;
      case 'users':
        this.users = this.users.map((users: User[]) => {
          let usersFiltered: User[] = users.filter((user: User) => {
            return (user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
          });

          this.warningMessage = usersFiltered.length == 0 ? 'No users were found' : '';

          return usersFiltered;
        });
        break;
    }

  }

  private loadingData(): void {
    this.users = this.userService.users;
    this.chats = this.userService.mapListKeys(this.chatService.chats)
      .map((chats: Chat[]) => chats.reverse());
  }
}
