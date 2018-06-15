import { ComponentsModule } from './../components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { UserService } from '../providers/user/user.service';
import { AuthService } from '../providers/auth/auth.service';
import { FeedBackService } from '../providers/feedback/feed-back.service';
import { ChatService } from '../providers/chat/chat.service';
import { MessageService } from '../providers/message/message.service';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyB5cgZFIWh2qanMSYdmUuTfMMLDKvmXAk4",
  authDomain: "ionic3-firebase-chat-90ad3.firebaseapp.com",
  databaseURL: "https://ionic3-firebase-chat-90ad3.firebaseio.com",
  storageBucket: "ionic3-firebase-chat-90ad3.appspot.com",
  messagingSenderId: "942062891729"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    AuthService,
    FeedBackService,
    ChatService,
    MessageService
  ]
})
export class AppModule { }
