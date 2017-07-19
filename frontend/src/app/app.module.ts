import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RequestsProvider } from '../providers/requests/requests';
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {EventPage} from "../pages/event/event";
import { EventsProvider } from '../providers/events/events';
import {LoginPage} from "../pages/login/login";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { NFC, Ndef } from '@ionic-native/nfc';
import {NfcPage} from "../pages/nfc/nfc";
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';
import { LoadingHandlerProvider } from '../providers/loading-handler/loading-handler';
import { PromptsProvider } from '../providers/prompt-handler/prompts';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventPage,
      LoginPage,
      NfcPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventPage,
      LoginPage,
      NfcPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RequestsProvider,
    EventsProvider,
    AuthServiceProvider,
      NFC,
      Ndef,
    ErrorHandlerProvider,
    LoadingHandlerProvider,
    PromptsProvider

  ]
})
export class AppModule {}
