import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {RequestsProvider} from "../../providers/requests/requests";
import {EventPage} from "../event/event";
import {EventsProvider} from "../../providers/events/events";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {LoginPage} from "../login/login";
import {LoadingHandlerProvider} from "../../providers/loading-handler/loading-handler";
import {PromptsProvider} from "../../providers/prompt-handler/prompts";

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
  showCreateModal: boolean= false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private requests: RequestsProvider,
              private eventService: EventsProvider, private authService: AuthServiceProvider,
              private alertCtrl: AlertController, public loadingHangler: LoadingHandlerProvider,
              public alertHandler: PromptsProvider) {

    this.events = [];
  }

  goToEvent(event) {
    this.eventService.activeEvent = event;
    this.navCtrl.push(EventPage);
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    if (this.ionViewCanEnter() == '_false') {
      this.navCtrl.setRoot(LoginPage);
      return;
    }
    this.setEvents()
  }

  ionViewCanEnter() {
    if (this.authService.isLoggedUser()) {
      return true
    }
    else {
      return '_false'
    }
  }

  loginRedirect() {
    this.navCtrl.setRoot(LoginPage);
  }

  setEvents() {
    this.loadingHangler.startLoading();
    this.requests.getEvents().subscribe(res => {
      console.log(res);
      this.events = res.events;
      this.loadingHangler.stopLoading();
    })
  }

  createEvent(name) {
    this.requests.addEvent(name).subscribe(res => {
      console.log(res);
      this.events = res.events;
      this.showCreateModal = false;
    })
  }

  editEvent(event) {
    let prompt = this.alertHandler.getEditEventPrompt();

    let confirmButton = {
      text: 'OK',
      handler: action => {
        if (action == 'edit') {
          console.log('edited: ' + event.name)
        }
        if (action == 'delete') {
          this.requests.deleteEvent(event.id)
              .subscribe(res => {
                this.events = res.events;
              })
        }
      }
    };
    prompt.addButton(confirmButton);
    prompt.present()
  }

  log(event, x) {
    console.log(x)
  }







}
