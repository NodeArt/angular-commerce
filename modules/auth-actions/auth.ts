import {Action} from '@ngrx/store';
import {User} from 'a2c-auth-interface';

export const LOGIN_EMAIL = '[A2C Auth] Login Email';
export const LOGIN_FB = '[A2C Auth] Login FB';
export const LOGIN_GOOGLE = '[A2C Auth] Login Google';
export const LOGOUT = '[A2C Auth] Logout';
export const LOGIN_SUCCESS = '[A2C Auth] Login Success';
export const LOGIN_FAILURE = '[A2C Auth] Login Failure';
export const LOGIN_REDIRECT = '[A2C Auth] Login Redirect';

export class LoginEmail implements Action {
  readonly type = LOGIN_EMAIL;

  constructor(public payload: { email: string, password: string }) {}
}

export class LoginFacebook implements Action {
  readonly type = LOGIN_FB;

  constructor(public payload?: any) {}
}

export class LoginGooglePlus implements Action {
  readonly type = LOGIN_GOOGLE;

  constructor(public payload?: any) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload?: User) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type Actions =
  | LoginEmail
  | LoginFacebook
  | LoginGooglePlus
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;
