import {AuthMethods, AuthProviders, AngularFire, FirebaseAuthState } from "angularfire2";
import {AuthMethod} from "./auth-method";
import {Injectable} from "@angular/core";

/**
 * Anonymous firebase auth service
 */
@Injectable()
export class AnonymouslyAuth implements AuthMethod{

  /**
   * Name of auth method
   */
  name: string = 'Anonymously';

  constructor(private firebase: AngularFire){
  }

  /**
   * Login method
   * @returns {firebase.Promise<FirebaseAuthState>} promise with FirebaseAuthState
   */
  login(){
    return this.firebase.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous
    });
  }
}
