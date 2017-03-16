import {AuthMethods, AuthProviders, AngularFire, FirebaseAuthState} from "angularfire2";
import {AuthMethod} from "./auth-method";
import {Injectable} from "@angular/core";

/**
 * Facebook firebase auth service
 */
@Injectable()
export class FacebookAuth implements AuthMethod{

  /**
   * Name of auth method
   */
  name: string = 'Facebook';

  constructor(private firebase: AngularFire){
  }

  /**
   * Login method
   * @returns {firebase.Promise<FirebaseAuthState>} promise with FirebaseAuthState
   */
  login(){
    return this.firebase.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    });
  }
}
