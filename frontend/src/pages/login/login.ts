import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RequestsProvider} from "../../providers/requests/requests";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private requests: RequestsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser() {
    this.requests.loginUser(this.username, this.password).subscribe(res => {
      localStorage.setItem('authToken', res.token)
    })
  }

}
