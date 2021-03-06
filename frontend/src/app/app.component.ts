import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {LoginPage} from "../pages/login/login";
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import {HomePage} from "../pages/home/home";
import {Http} from "@angular/http";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = this.getRootPage();
  //rootPage:any = NfcPage;

  constructor(platform: Platform, statusBar: StatusBar, private http:Http,
              splashScreen: SplashScreen, private authService: AuthServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  getRootPage() {
    if (this.authService.isLoggedUser()) {
      return HomePage
    }
    else {
      return LoginPage
    }
  }


}

