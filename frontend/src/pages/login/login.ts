import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RequestsProvider} from "../../providers/requests/requests";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private requests: RequestsProvider,
  private authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {

  }

  loginUser() {
    this.requests.loginUser(this.username, this.password).subscribe(res => {
      localStorage.setItem('authToken', res.token);
      this.authService.loggedIn();
      this.navCtrl.setRoot(HomePage);
    })
  }
}

