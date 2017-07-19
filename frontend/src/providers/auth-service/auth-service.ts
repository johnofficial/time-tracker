import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  private isLoggedIn: boolean;

  constructor(public http: Http) {
    localStorage.removeItem('authTokem');
    if (localStorage.getItem('authToken')) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }

  loggedIn() {
    this.isLoggedIn = true;
  }

  loggedOut() {
    this.isLoggedIn = false;
  }

  isLoggedUser() {
    return this.isLoggedIn
  }

}
