import { Component } from '@angular/core';
import { App,MenuController,IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase' ;
import {UpdateProfilePage} from '../update-profile/update-profile';
import {HomePage} from '../home/home';

//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public fireauth:any;
  public userProfile:any;
  public user:any;
  public logoutFlag:any=false;

  constructor(app: App, menu: MenuController,public navCtrl: NavController, public navParams: NavParams) {
    this.fireauth=firebase.auth();
    this.userProfile=firebase.database().ref('users');
this.user=this.fireauth.currentUser;
menu.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.greet();
  }

  greet(){
    console.log(this.fireauth.currentUser.email);
  }


  goToUpdateProfilePage(){
    this.navCtrl.push(UpdateProfilePage);

  }
  goToQRScanResultPage(){

  }

  userLogout(){
    this.navCtrl.setRoot(HomePage,{
      logoutFlag:'true'
    });
    this.logoutFlag="true";
        console.log("Success"+this.logoutFlag);

    this.fireauth.signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  console.log("Fail")
  // An error happened.
});
  }

}
