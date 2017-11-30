import {Inject, Injectable, Optional} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {IAuth} from 'a2c-auth-interface';

import * as auth from 'a2c-auth-actions';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthEffects {
  constructor(protected actions$: Actions,
              @Optional() @Inject('IAuth') protected authService: IAuth) {}

  @Effect()
  protected loginWithEmail$ = this.actions$
    .ofType(auth.LOGIN_EMAIL)
    .map((action: auth.LoginEmail) => action.payload)
    .exhaustMap((credentials: { email: string, password: string}) =>
      this.authService.loginEmail(credentials.email, credentials.password)
        .map(user => new auth.LoginSuccess(user))
        .catch((error) => Observable.of(new auth.LoginFailure(error))));
}
