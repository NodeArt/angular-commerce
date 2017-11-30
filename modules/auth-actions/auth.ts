import {Action} from '@ngrx/store';
import {User} from 'a2c-auth-interface';

export const LOGIN_EMAIL = '[A2C Auth] Login Email';
export const LOGIN_FB = '[A2C Auth] Login FB';
export const LOGIN_GOOGLE = '[A2C Auth] Login Google';
export const LOGIN_SUCCESS = '[A2C Auth] Login Success';
export const LOGIN_FAILURE = '[A2C Auth] Login Failure';
export const LOGIN_REDIRECT = '[A2C Auth] Login Redirect';

export const LOGOUT = '[A2C Auth] Logout';
export const LOGOUT_SUCCESS = '[A2C Auth] Logout Success';
export const LOGOUT_FAILURE = '[A2C Auth] Logout Failure';

export const REGISTER_EMAIL = '[A2C Auth] Register Email';
export const REGISTER_FAILURE = '[A2C Auth] Register Failure';

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

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
}

export class LogoutFailure implements Action {
  readonly type = LOGOUT_FAILURE;

  constructor(public payload: any) {}
}

export class RegisterEmail implements Action {
  readonly type = REGISTER_EMAIL;

  constructor(public payload: { email: string, password: string }) {}
}

export class RegisterFailure implements Action {
  readonly type = REGISTER_FAILURE;

  constructor(public payload: any) {}
}

export type Actions =
  | LoginEmail
  | LoginFacebook
  | LoginGooglePlus
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | LogoutSuccess
  | LogoutFailure
  | RegisterEmail
  | RegisterFailure;
