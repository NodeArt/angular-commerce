import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromAuth from 'a2c-auth';
import * as layout from '../actions/layout';

@Component({
  selector: 'app-root',
  template: `
    <app-layout>
      <app-sidenav [open]="showSidenav$ | async">
        <app-nav-item (navigate)="closeSidenav()" *ngIf="loggedIn$ | async" routerLink="/products">
          Products
        </app-nav-item>
        <app-nav-item (navigate)="closeSidenav()">
          Close
        </app-nav-item>
      </app-sidenav>
      <app-toolbar (openMenu)="openSidenav()">
        Products collection
      </app-toolbar>

      <router-outlet></router-outlet>
    </app-layout>
  `,
  styles: [``],
})
export class AppComponent {

  public showSidenav$: Observable<boolean>;

  public loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
    console.log(this.store);
  }

  public closeSidenav(): void {
    this.store.dispatch(new layout.CloseSidenav());
  }

  public openSidenav(): void {
    this.store.dispatch(new layout.OpenSidenav());
  }
}
