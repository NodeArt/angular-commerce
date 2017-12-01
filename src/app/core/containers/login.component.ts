import {Component} from '@angular/core';

import * as fromRoot from '../../reducers';
import * as auth from 'a2c-auth-actions';

import {Store} from '@ngrx/store';

@Component({
  selector: 'app-login',
  template: `
    <app-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async">
    </app-login-form>
  `,
  styles: [``]
})
export class LoginComponent {
  pending$ = this.store.select(fromRoot.getLoginPending);
  error$ = this.store.select(fromRoot.getLoginError);

  constructor(private store: Store<fromRoot.State>) {}

  onSubmit(event) {
    switch (event.type) {
      case 'email': {
        this.store.dispatch(new auth.LoginEmail(event.payload));
        break;
      }
      case 'google': {
        this.store.dispatch(new auth.LoginGooglePlus());
        break;
      }
      case 'facebook': {
        this.store.dispatch(new auth.LoginFacebook());
        break;
      }
    }
  }
}
