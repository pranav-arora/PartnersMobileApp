import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase' ;
import {UpdateProfilePage} from '../update-profile/update-profile';
import {HomePage} from '../home/home';
import { App, MenuController } from 'ionic-angular';
import {EventsListPage} from '../events-list/events-list';
import {QrScanListResultPage} from '../qr-scan-list-result/qr-scan-list-result';
import { ToastController } from 'ionic-angular';


//import { BarcodeScanner } from '@ionic-native/barcode-scanner';/**


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
  public userDetails:any;
  scannedCode = null;
  address:string;
  detail:any;
    firstname:string;
    OCIMemberID:string;
    lastname:string;
    workplaceName:string;
    workplaceDesignation:string;
    education:string;
    phone:number;
    speciality:string;

  constructor(private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams,app: App, public menu: MenuController) {
    this.menu.enable(true);
    console.log(this.menu.getMenus());
    this.fireauth=firebase.auth();
    this.userProfile=firebase.database().ref('users');
    this.user=this.fireauth.currentUser;
console.log(this.fireauth.currentUser);
  }


  presentToast2(message:string) {
  let toast2 = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'top'
  });
  toast2.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast2.present();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.greet();
    console.log(firebase.auth().currentUser.uid);
      this.userProfile.child(firebase.auth().currentUser.uid).once('value').then(snapshot =>{
        this.firstname=snapshot.val().firstName;
        this.lastname=snapshot.val().lastName;
        this.speciality=snapshot.val().speciality;
        this.workplaceDesignation=snapshot.val().workplaceDesignation;
        this.address=snapshot.val().address;
        this.phone=snapshot.val().phone;
      })

  }

  greet(){
    console.log(this.fireauth.currentUser.email);
  }
  goToEventListPage(){
    this.navCtrl.push(EventsListPage)
  }

  goToUpdateProfilePage(){
    this.navCtrl.push(UpdateProfilePage);

  }
  goToQRScanResultPage(){
    this.navCtrl.push(QrScanListResultPage);
}

  userLogout(){
    this.presentToast2("You Logged out successfully!");
    this.navCtrl.setRoot(HomePage,{
      logoutFlag:'true'
    });
    this.logoutFlag="true";
        console.log("Success"+this.logoutFlag);

    this.fireauth.signOut().then(function() {
}, function(error) {
  console.log("Fail")
  // An error happened.
});
  }

}
