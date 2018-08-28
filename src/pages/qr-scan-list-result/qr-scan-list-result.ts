import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
/**
 * Generated class for the QrScanListResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-scan-list-result',
  templateUrl: 'qr-scan-list-result.html',
})
export class QrScanListResultPage {
  scannedCode=null;
  error=null;
  constructor(private barcodeScanner:BarcodeScanner ,private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {

  }

  presentAlert(message:string) {
  let alert = this.alertCtrl.create({
    title: message,
    subTitle: '',
    buttons: ['Dismiss']
  });
  alert.present();
}

  ionViewDidLoad() {

    console.log('ionViewDidLoad QrScanListResultPage');
    this.scanCode();


}

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData=>{
      this.scannedCode=barcodeData.text;
    },
  err=>{
    this.error=err;
  })
  }

}
