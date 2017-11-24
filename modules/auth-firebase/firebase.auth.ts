import {Injectable} from '@angular/core';
import {IAuth, User} from 'a2c-auth-interface';
import {ZoneScheduler} from './utils/zone-scheduler';

import * as firebase from 'firebase';

import {Observable} from 'rxjs/Observable';
import {observeOn} from 'rxjs/operator/observeOn';
import 'rxjs/add/operator/first';

@Injectable()
export class FirebaseAuth implements IAuth {

  protected authState: Observable<firebase.User>;

  protected readonly auth: firebase.auth.Auth = firebase.auth();

  public constructor(authState: Observable<firebase.User>) {
    this.authState = this.firebaseAuthStateObservable();
  }

  protected firebaseAuthStateObservable(): Observable<firebase.User> {
    const obs = Observable.create((observer) => {
      this.auth.onAuthStateChanged(
        (user?: firebase.User) => observer.next(user),
        (error: firebase.auth.Error) => observer.error(error)
      );
    });
    return observeOn.call(obs, new ZoneScheduler(Zone.current));
  }

  public getUID(): string | null {
    const user = this.getCurrentUser();
    return user && user.uid ? user.uid : null;
  }

  protected getCurrentUser(): firebase.User | null {
    return this.auth.currentUser;
  }

  public getAuthStatus(): Observable<boolean> {
    return this.authState.map((auth) => !!auth).first();
  }

  public loginGoogle(): Observable<User> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.loginWithProvider(provider);
  }

  public loginFacebook(): Observable<User> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.loginWithProvider(provider);
  }

  protected loginWithProvider(provider: firebase.auth.AuthProvider): Observable<User> {
    return Observable.fromPromise(this.auth.signInWithPopup(provider))
      .map((userCredential: firebase.auth.UserCredential) => this.formUser(userCredential));
  }

  public loginEmail(email: string, password: string): Observable<void> {
    return Observable.fromPromise(this.auth.signInWithEmailAndPassword(email, password));
  }

  public registerWithEmail(email: string, password: string): Observable<User> {
    return Observable.fromPromise(this.auth.createUserWithEmailAndPassword(email, password))
      .map((userCredential: firebase.auth.UserCredential) => this.formUser(userCredential));
  }

  public logout(): Observable<void> {
    return Observable.fromPromise(this.auth.signOut());
  }

  protected formUser(data: Object): User {
    return {
      uid: this.getUID(),
      ...data,
    } as User;
  }

  public getRoles(uid: User): Array<string> {
    throw new Error('Unimplemented method');
  }

  public checkRole(role: string): boolean {
    throw new Error('Unimplemented method');
  }

  public isAuth(uid?: string): boolean {
    return !!this.getCurrentUser();
  }
}
