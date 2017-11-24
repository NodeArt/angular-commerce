import {Observable} from 'rxjs/Observable';

export interface User {
  uid: string | Object;
}

export interface IAuth {
  loginGoogle(): Observable<User>;

  loginFacebook(): Observable<User>;

  loginEmail(email: string, password: string): Observable<void>;

  registerWithEmail(email: string, password: string): Observable<User>;

  getRoles(uid: User): Array<string>;

  checkRole(role: string): boolean;

  isAuth(uid?: string): boolean;
}
