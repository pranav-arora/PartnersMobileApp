import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase' ;
import { ProfilePage } from '../profile/profile';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})


export class SignUpPage {
  @ViewChild('UserEmail') userEmail;
  @ViewChild('UserPassword') userPassword;
  @ViewChild('UserPhoneNo') userPhoneNo;
  @ViewChild('UserAddress') userAddress;

  public fireauth:any;
  public userProfile:any;

  constructor(
    public navCtrl: NavController, public navParams: NavParams) {
      this.fireauth=firebase.auth();
      this.userProfile=firebase.database().ref('users');
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  doRegisterAndLogin(){
        this.registerUser().then(authData=>{
          this.navCtrl.push(ProfilePage);
        },error =>{
          console.log(error);
        })
    }

 registerUser(){
   return this.fireauth.createUserWithEmailAndPassword(this.userEmail.value,this.userPassword.value).
   then((newUser)=>{
     this.fireauth.signInWithEmailAndPassword(this.userEmail.value,this.userPassword.value)
     .then((authenticatedUser)=>{
       this.userProfile.child(authenticatedUser.uid).set({
         phone:this.userPhoneNo.value,
         address:this.userAddress.value
       })
     })
   })
  }


}
