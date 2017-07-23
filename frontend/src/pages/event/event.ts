import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EventsProvider} from "../../providers/events/events";
import {RequestsProvider} from "../../providers/requests/requests";

/**
 * Generated class for the EventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'event.html',
})
export class EventPage {

  hours: number;
  minutes: number;
  seconds: number;

  interval:any;
  event: any;

  period: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventService: EventsProvider,
  private requests: RequestsProvider) {

    this.requests.getPeriod(this.eventService.activeEvent.id).subscribe(res => {
      console.log(res);
      this.period = res.period;
      this.event = res.event;
      this.setCount();
    });

    if (this.eventService.switchActiveEvent) {
      this.eventSwitch()
    }

    if (this.eventService.activeEvent.active){

      this.interval = setInterval(
        () => {
          console.log('works');
          this.raiseCount()
        }, 1000);
    }
  }

  ionViewDidLoad() {

  }

  ngOnDestroy() {
    this.eventService.activeEvent = null;
    this.eventService.switchActiveEvent = false;
    clearInterval(this.interval);
  }

  raiseCount() {
    if (this.seconds == 59) {
      this.minutes += 1;
      this.seconds = 0;
      return
    }

    if(this.minutes == 59) {
      this.hours += 1;
      this.minutes = 0;
      this.seconds = 0;
      return
    }

    this.seconds += 1;

  }

  setCount() {

    this.hours = parseInt(this.period.substring(0, this.period.search(':')));
    let _restStr = this.period.substring(this.period.search(':') + 1, this.period.length);

    this.minutes = parseInt(_restStr.substring(0, _restStr.search(':')));
    _restStr = _restStr.substring(_restStr.search(':') + 1, _restStr.length);

    this.seconds = parseInt(_restStr)

  }

  eventSwitch() {
    this.requests.switchEvent(this.eventService.activeEvent.id).subscribe(res => {
      console.log(res);
      this.eventService.activeEvent = res.event;

      if (res.action == 'started') {
        this.setCount();
        this.interval = setInterval(
          () => {
            console.log('works');
            this.raiseCount()
          }, 1000);
      }

      if (res.action == 'stopped') {
        this.period = res.period;
        clearInterval(this.interval);
      }
    })
  }

}
