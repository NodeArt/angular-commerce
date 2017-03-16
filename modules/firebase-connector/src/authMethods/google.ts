import {AuthMethods, AuthProviders, AngularFire, FirebaseRef, FirebaseAuthState} from "angularfire2";
import {AuthMethod} from "./auth-method";
import {Injectable, Inject} from "@angular/core";

/**
 * Google firebase auth service
 */
@Injectable()
export class GoogleAuth implements AuthMethod{

  /**
   * Name of auth method
   */
  name: string = 'Google';

  constructor(private firebase: AngularFire){
  }

  /**
   * Login method
   * @return {firebase.Promise<FirebaseAuthState>} promise with FirebaseAuthState
   */
  login(){
    return this.firebase.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }
}
