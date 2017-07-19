import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController} from "ionic-angular";
import {Observable} from "rxjs";
import {RequestsProvider} from "../requests/requests";

/*
  Generated class for the PromptsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PromptsProvider {

  constructor(public http: Http, private alertCtrl: AlertController,
  private requests: RequestsProvider) {
  }



  getEditEventPrompt() {
    return this.alertCtrl.create({
      title: 'Event name',
      message: "Please enter a name of created event",
      inputs: [
        {
          name: 'action',
          type: 'radio',
          label: 'Delete',
          value: 'delete'
        },
        {
          name: 'action',
          placeholder: 'Event name',
          type: 'radio',
          label: 'Edit',
          value: 'edit'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        }
      ]
    });
  }

  getCreateEventPrompt() {
    return this.alertCtrl.create({
      title: 'Event name',
      message: "Please enter a name of created event",
      inputs: [
        {
          name: 'name',
          placeholder: 'Event name'
        },
      ],
      buttons: [

        {
          text: 'Cancel'
        }
      ]
    });
  }
}
