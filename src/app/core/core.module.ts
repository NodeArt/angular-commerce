import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';

import * as firebase from 'firebase';
import {config} from '../../config/firebase.config';
import {FirestoreConnector} from 'a2c-firestore-connector';

firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppComponent,
  ],
  providers: [
    { provide: 'IConnector', useClass: FirestoreConnector}
  ],
})
export class CoreModule {}
