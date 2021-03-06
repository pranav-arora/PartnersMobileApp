import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http'


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ProfilePage } from '../pages/profile/profile';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import {QrScanListResultPage} from '../pages/qr-scan-list-result/qr-scan-list-result';
import {EventsListPage} from '../pages/events-list/events-list';
import { DescriptionPage } from '../pages/description/description';
import { Camera } from '@ionic-native/camera';
import { QRScanner } from '@ionic-native/qr-scanner';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SignupServiceProvider } from '../providers/signup-service/signup-service';


const config = {
    apiKey: "AIzaSyA0N6d1m4Fq2byy_jS4VrEJhFfT0stIvZI",
    authDomain: "partnersmobileappdb.firebaseapp.com",
    databaseURL: "https://partnersmobileappdb.firebaseio.com",
    projectId: "partnersmobileappdb",
    storageBucket: "partnersmobileappdb.appspot.com",
    messagingSenderId: "218689516566"
  };



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    ProfilePage,
    UpdateProfilePage,
    QrScanListResultPage,
    EventsListPage,
    DescriptionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    ProfilePage,
    UpdateProfilePage,
    QrScanListResultPage,
    EventsListPage,
    DescriptionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    QRScanner,
    BarcodeScanner,
    SignupServiceProvider
  ]
})
export class AppModule {}
