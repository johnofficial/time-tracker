import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestsProvider {

  private API_URL = 'http://138.68.76.20:8808/api';
  // private API_URL = 'http://localhost:8808/api';

  private get_auth_header() {
    let token = localStorage.getItem('authToken');
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
    return this.http.get(this.API_URL + '/event-period/' + id_event, this.get_auth_header()).map(res => res.json())
  }

  switchEvent(id_event) {
    return this.http.put(this.API_URL + '/switch/' + id_event, {}).map(res => res.json())
  }

  deleteEvent(id_event) {
    return this.http.delete(this.API_URL + '/events?id_event=' + id_event).map(res => res.json())
  }

  loginUser(username, password) {
    return this.http.post('http://138.68.76.20:8808/user/login', {
      username: username,
      password: password,
      data: {}
    }).map(res => res.json())

  }



}
