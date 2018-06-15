import { Component, Input } from '@angular/core';
import { SmileModel } from '../../models/smiles.model';

@Component({
  selector: 'input-message',
  templateUrl: 'input-message.component.html'
})
export class InputMessageComponent {

  @Input() smile: SmileModel;

  constructor() {

  }

  ngOnChanges() {
    if (this.smile) document.getElementById('inner').innerHTML += `<img src='${this.smile.image}' />`;
  }

  get text(): string {
    return document.getElementById('inner').innerHTML;
  }

  clear(): void {
    document.getElementById('inner').innerHTML = '';
  }

}
