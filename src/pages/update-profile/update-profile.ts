import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase' ;
/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {

  public fireauth:any;
  public userProfile:any;
  public user:any;

  gender: string = "f";
  month: number;
  year:number;
  firstName:string;
  lastName:string;
  userPhoneNo:number;
  email:string ;
  address:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fireauth=firebase.auth();
    this.userProfile=firebase.database().ref('users');
    this.user=this.fireauth.currentUser;
    this.email=this.user.email;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfilePage');
  }


  updateInfo(){
    console.log(this.gender);
    this.userProfile.child(this.user.uid).set({
      gender:this.gender,
      month: this.month,
      year:this.year,
      firstName:this.firstName,
      lastName:this.lastName,
      phone:this.userPhoneNo,
      address:this.address
    })



}

}
