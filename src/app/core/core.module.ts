import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';

import * as firebase from 'firebase';
import {config} from '../../config/firebase.config';
import {FirestoreConnector} from 'a2c-firestore-connector';
import {ProductsModule} from 'a2c-products';

firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    ProductsModule.forRoot(),
  ],
  exports: [
    AppComponent,
  ],
  providers: [
    { provide: 'IConnector', useClass: FirestoreConnector}
  ],
})
export class CoreModule {}
