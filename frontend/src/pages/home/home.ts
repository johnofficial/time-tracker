import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {RequestsProvider} from "../../providers/requests/requests";
import {EventPage} from "../event/event";
import {EventsProvider} from "../../providers/events/events";

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  events: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
  private requests: RequestsProvider, private eventService: EventsProvider) {
    this.events = [];
    localStorage.setItem('authToken', 's00000gbKWs5hFiEcJk8mU81HI6aj0NRXuDwYVk2fuqd3Q67cAJB1XSsHmUrT69B');
    this.setEvents()
  }

  goTo(event) {
    this.eventService.activeEvent = event;
    this.navCtrl.push(EventPage);
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.setEvents();
  }

  setEvents() {
    this.requests.getEvents().subscribe(res => {
      this.events = res.events
    })
  }

  addEvent(data) {
    this.events.push(
      {name: data.name, created: 'now'});
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
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
        },
        {
          text: 'Create',
          handler: data => {
            this.requests.addEvent(data.name).subscribe(res => {
              this.events = res.events;
            });
          }
        }
      ]
    });
    prompt.present();
  }

  deleteEvent(i) {
    console.log('delete')
    this.events.splice(i, 1);
  }

}
