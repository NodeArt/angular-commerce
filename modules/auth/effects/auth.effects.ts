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
    .exhaustMap(({ email, password }) =>
      this.authService.loginEmail(email, password)
        .map(user => new auth.LoginSuccess(user))
        .catch((error) => Observable.of(new auth.LoginFailure(error))));

  @Effect()
  protected loginWithFacebook$ = this.actions$
    .ofType(auth.LOGIN_FB)
    .exhaustMap(() =>
      this.authService.loginFacebook()
        .map(user => new auth.LoginSuccess(user))
        .catch((error) => Observable.of(new auth.LoginFailure(error))));

  @Effect()
  protected loginWithGoogle$ = this.actions$
    .ofType(auth.LOGIN_GOOGLE)
    .exhaustMap(() =>
      this.authService.loginGoogle()
        .map(user => new auth.LoginSuccess(user))
        .catch((error) => Observable.of(new auth.LoginFailure(error))));

  @Effect()
  protected registerWithEmail$ = this.actions$
    .ofType(auth.REGISTER_EMAIL)
    .map((action: auth.RegisterEmail) => action.payload)
    .exhaustMap(({ email, password }) =>
      this.authService.registerWithEmail(email, password)
        .map(user => new auth.LoginEmail({ email, password }))
        .catch((error) => Observable.of(new auth.RegisterFailure(error))));

  @Effect()
  protected logout$ = this.actions$
    .ofType(auth.LOGOUT)
    .exhaustMap(() =>
      this.authService.logout()
        .map(() => new auth.LogoutSuccess())
        .catch((error) => Observable.of(new auth.LogoutFailure(error))));
}
