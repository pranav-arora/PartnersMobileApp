import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase' ;
import { ProfilePage } from '../profile/profile';
import { AlertController } from 'ionic-angular';
import {HomePage} from '../home/home';
import { ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup ,AbstractControl} from '@angular/forms';
import {SignupServiceProvider} from '../../providers/signup-service/signup-service';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})


export class SignUpPage {
  @ViewChild('UserEmail') userEmail;
  @ViewChild('UserPassword') userPassword;

  items: any;
  firstname:string;
  UserPhoneNo:string;
  UserAddress:string;
  OCIMemberID:string;
  lastname:string;
  workplaceName:string;
  workplaceDesignation:string;
  education:string;
  university:string;
  speciality:string;
  public fireauth:any;
  public userProfile:any;
  formgroup:FormGroup;
  // OCIMemberID:AbstractControl;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public formbuilder: FormBuilder,
     public navParams: NavParams,
   public signupServiceProvider: SignupServiceProvider) {


      this.fireauth=firebase.auth();
      this.userProfile=firebase.database().ref('users');
      // this.formgroup=formbuilder.group({
      //   OCIMemberID:['',Validators.required],
      // });
      // console.log(this.formgroup.controls.OCIMemberID.hasError('required'));
      // this.OCIMemberID=this.formgroup.controls['OCIMemberID'];

  }

  presentAlert(message) {
  let alert = this.alertCtrl.create({
    title: 'Info',
    subTitle: message,
    buttons: ['Dismiss']
  });
  alert.present();
}

presentToast(message:string) {
let toast = this.toastCtrl.create({
  message: message,
  duration: 3000,
  position: 'top'
});
}


initialize(){
  this.OCIMemberID="";
  this.firstname="";
  this.lastname="";
  this.UserPhoneNo="";
  this.UserAddress="";
  this.workplaceName="";
  this.workplaceDesignation="";
  this.education="";
  this.university="";
  this.speciality="";
}

  goHome(){
    this.navCtrl.setRoot(HomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
    this.initialize();
    console.log(this.OCIMemberID);
    this.getSpecialisations();
  }

  doRegisterAndLogin(){
    if (this.userEmail.value !="" && this.userPassword.value !="" ) {
      console.log(this.OCIMemberID);
      if(this.OCIMemberID !=""){
      this.registerUser().then(authData => {
        this.presentToast("Registered Successfully");
      },error =>{
        console.log(error);
        this.presentAlert(error);
      })}
      else {
        this.presentAlert("OCIMemberID is mandatory.")
      }
} else {
  this.presentAlert("e-mail and password are required!!");
}

    }

    getSpecialisations() {
    this.signupServiceProvider
      .getSpecialisationInit()
      .subscribe(data => {
        this.items = data;
        // return data;
        console.log("specialisation=", this.items);
      });

  }




 registerUser(){
   return this.fireauth.createUserWithEmailAndPassword(this.userEmail.value,this.userPassword.value).
   then((newUser)=>{
     this.fireauth.signInWithEmailAndPassword(this.userEmail.value,this.userPassword.value)
     .then((authenticatedUser)=>{
       console.log("inside signin");
       this.userProfile.child(authenticatedUser.uid).set({
         OCIMemberID:this.OCIMemberID,
         phone:this.UserPhoneNo,
         address:this.UserAddress,
         firstName:this.firstname,
         lastName:this.lastname,
         workplaceName:this.workplaceName,
         workplaceDesignation:this.workplaceDesignation,
         education:this.education,
         university:this.university,
         speciality:this.speciality
       });
       this.navCtrl.setRoot(ProfilePage);
     },
   err=>{
     this.presentAlert(err);
   })
 },err =>{
   this.presentAlert(err);
 })
  }


}
