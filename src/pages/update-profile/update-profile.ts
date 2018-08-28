import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase' ;
import { ToastController } from 'ionic-angular';

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
  month: any;
  year:any;
  firstName:string;
  lastName:string;
  userPhoneNo:any;
  email:string ;
  Date:any;
  userAddress:string;
  workplaceName:string;
  workplaceDesignation:string;
  education:string;
  university:string;
  speciality:string;


  constructor(private toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    this.fireauth=firebase.auth();
    this.userProfile=firebase.database().ref('users');
    this.user=this.fireauth.currentUser;
    this.email=this.user.email;
  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Details Successfully Updated',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfilePage');
    this.initialize();
  }

  initialize(){
    this.gender="";
    this.month="";
    this.year="";
    this.firstName="";
    this.lastName="";
    this.userPhoneNo="";
    this.Date="";
    this.userAddress="";
    this.workplaceName="";
    this.workplaceDesignation="";
    this.education="";
    this.university="";
    this.speciality="";
  }

  updateInfo(){

    this.presentToast();
    console.log(this.gender);
    this.userProfile.child(this.user.uid).set({
      gender:this.gender,
      month: this.month,
      year:this.year,
      date:this.Date,
      firstName:this.firstName,
      lastName:this.lastName,
      phone:this.userPhoneNo,
      address:this.userAddress,
      workplaceName:this.workplaceName,
      workplaceDesignation:this.workplaceDesignation,
      education:this.education,
      university:this.university,
      speciality:this.speciality
    })



}

}
