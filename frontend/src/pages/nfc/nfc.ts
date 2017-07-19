import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NFC, Ndef } from '@ionic-native/nfc';

/**
 * Generated class for the NfcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html',
})
export class NfcPage {

    text: string;
    data: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private nfc: NFC, private ndef: Ndef) {

      this.checkNFC();
  }

  ionViewDidLoad() {
  }


    checkNFC() {
      this.nfc.enabled()
            .then(() => {
                this.addListenNFC();
            });
    }

    addListenNFC() {
        this.nfc.addNdefListener(nfcEvent => this.eventHandler(nfcEvent)).subscribe(data => {
            // this.text = 'ID: ' + this.nfc.bytesToHexString(data.tag.id);
            this.text = "ID: " + this.nfc.bytesToHexString(data.tag.id) ;
            this.data = this.nfc.bytesToString(data.tag.ndefMessage[0].payload);
            console.log(data);
        });
    }


    eventHandler(e) {

    }

    clearMsg() {
        this.text = '';
    }

    showSettings() {
      this.nfc.showSettings()
    }

    write2nfc() {
        let _msg = [
            this.ndef.textRecord("HelloNFC")
        ];

        this.nfc.write(_msg).then(() => {
            this.text = "Success wrote!";
        }).catch(err => {
            this.text = 'Error writing: ' + err;
        })
    }




}

