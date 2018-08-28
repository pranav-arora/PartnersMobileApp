import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
/*
  Generated class for the SignupServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignupServiceProvider {
  baseUrl2: string;

  constructor(private http: Http) {
    this.http = http;
     this.baseUrl2 = 'http://oapp.delhinerds.com/specialisation/';
  }


  getSpecialisationInit() {
    return this.http.get(this.baseUrl2)
      .map(res => res.json())
  }

}
