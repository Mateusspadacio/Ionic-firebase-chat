import { Component, Input } from '@angular/core';

import { Message } from './../../models/message.model';


/*
  <message-box [style.justify-content]=""></message-box>

  injeta diretamente em todos os components
*/

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.component.html',
  host: {
    '[style.justify-content]': '(!isFromSender) ? "flex-start" : "flex-end"'
  }
})
export class MessageBoxComponent {

  @Input() message: Message;
  @Input() isFromSender: boolean;
  width: string = (window.innerWidth - 20) + 'px';

  constructor() {
  }

}
