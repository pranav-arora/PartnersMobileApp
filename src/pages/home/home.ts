import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { ProfilePage } from '../profile/profile';
import {AngularFireAuth} from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  logoutFlag:boolean;
  @ViewChild('UserEmailId') userEmail;
  @ViewChild('UserPassword') userPassword;

  constructor(public loadingCtrl: LoadingController,private toastCtrl: ToastController,private navParam:NavParams,private fire: AngularFireAuth,public navCtrl: NavController,public alertCtrl: AlertController) {

    this.logoutFlag=navParam.get('logoutFlag');

  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }


  presentToast(message:string) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

  showAlert(info:string, message:string) {
    let alert = this.alertCtrl.create({
      title: info,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


openSignUpPage(){
  this.navCtrl.push(SignUpPage);
}

doLogin(){
  this.presentLoading();
  this.fire.auth.signInWithEmailAndPassword(this.userEmail.value,this.userPassword.value)
  .then(data=>{
    this.presentToast('You logged in successfully.');
        this.navCtrl.setRoot(ProfilePage);
  })
  .catch(err=>{
    this.showAlert('fail',err.message);
    console.log("login fail",err);
  })

}


}
