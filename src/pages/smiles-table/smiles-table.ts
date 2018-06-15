import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SMILES, SmileModel } from '../../models/smiles.model';

@IonicPage()
@Component({
  selector: 'page-smiles-table',
  templateUrl: 'smiles-table.html',
})
export class SmilesTablePage {

  smiles: Array<SmileModel> = SMILES;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  insertSmile(s: SmileModel) {
    this.viewCtrl.dismiss(s);
  }

}
