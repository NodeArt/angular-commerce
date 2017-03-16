import {AuthMethods, AuthProviders, AngularFire, FirebaseAuthState} from "angularfire2";
import {AuthMethod} from "./auth-method";
import {Injectable} from "@angular/core";

/**
 * Twitter firebase auth service
 */
@Injectable()
export class TwitterAuth implements AuthMethod{

  /**
   * Name of auth method
   */
  name: string = 'Twitter';

  constructor(private firebase: AngularFire){
  }
  /**
   * Login method
   * @return {firebase.Promise<FirebaseAuthState>} promise with FirebaseAuthState
   */
  login(){
    return this.firebase.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    });
  }
}
