import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';

import * as firebase from 'firebase';
import {config} from '../../config/firebase.config';
import {FirestoreConnector} from 'a2c-firestore-connector';

import {AppComponent} from './containers/app.component';
import {NotFoundPageComponent} from './containers/not-found-page.component';
import {LayoutComponent} from './components/layout';
import {NavItemComponent} from './components/nav-item';
import {SidenavComponent} from './components/sidenav';
import {ToolbarComponent} from './components/toolbar';
import {LoginFormComponent} from './components/login-form.component';
import {LoginComponent} from './containers/login.component';
import {ReactiveFormsModule} from '@angular/forms';

firebase.initializeApp(config);

const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
  LoginFormComponent,
  LoginComponent,
];

const MATERIAL = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatInputModule,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    ...MATERIAL,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: COMPONENTS,
  providers: [
    { provide: 'IConnector', useClass: FirestoreConnector}
  ],
})
export class CoreModule {}
