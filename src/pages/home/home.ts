import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { ProfilePage } from '../profile/profile';
import {AngularFireAuth} from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  logoutFlag:boolean;
  @ViewChild('UserEmailId') userEmail;
  @ViewChild('UserPassword') userPassword;

  constructor(private navParam:NavParams,private fire: AngularFireAuth,public navCtrl: NavController,public alertCtrl: AlertController) {

    this.logoutFlag=navParam.get('logoutFlag');
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
  this.fire.auth.signInWithEmailAndPassword(this.userEmail.value,this.userPassword.value)
  .then(data=>{
    this.showAlert('Success',' You logged in successfully.');
    console.log("login success",data);
    this.navCtrl.push(ProfilePage);
  })
  .catch(err=>{
    this.showAlert('fail',err.message);
    console.log("login fail",err);
  })

}


}
