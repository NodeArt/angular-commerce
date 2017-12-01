import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers/index';

import {AppComponent} from './core/containers/app.component';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';
import {routes} from './routes';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AuthModule} from 'a2c-auth';
import {FirebaseAuth} from 'a2c-auth-firebase';
import {FirestoreConnector} from 'a2c-firestore-connector';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    CoreModule,
    AuthModule.forRoot(),
  ],
  providers: [
    { provide: 'IConnector', useClass: FirestoreConnector },
    { provide: 'IAuth', useClass: FirebaseAuth },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
