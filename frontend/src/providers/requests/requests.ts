import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RequestsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RequestsProvider {

  private API_URL = 'http://localhost:8802/api';

  private get_auth_header() {
    let token = localStorage.getItem('authToken');
    // let token ='s00000gbKWs5hFiEcJk8mU81HI6aj0NRXuDwYVk2fuqd3Q67cAJB1XSsHmUrT69B';
    let header = new Headers({Authorization: token});
    return new RequestOptions({headers: header})
  }

  constructor(public http: Http) {
  }

  addEvent(name) {
    return this.http.post(this.API_URL + '/events', {
      event_name: name
    }, this.get_auth_header()).map(res => res.json())
  }

  getEvents() {
    return this.http.get(this.API_URL + '/events', this.get_auth_header()).map(resp => resp.json())
  }

  getPeriod(id_event) {
    console.log(id_event)
    return this.http.get(this.API_URL + '/event-period/' + id_event, this.get_auth_header()).map(res => res.json())
  }

  switchEvent(id_event) {
    return this.http.put(this.API_URL + '/switch/' + id_event, {}).map(res => res.json())
  }

}
