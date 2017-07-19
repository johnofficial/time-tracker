import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoadingHandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoadingHandlerProvider {

  private _isLoading: boolean = false;

  constructor(public http: Http) {
  }

  isLoading(): boolean {
    return this._isLoading
  }

  startLoading() {
    this._isLoading = true;
  }

  stopLoading() {
    this._isLoading = false;
  }

}
