import {AuthMethods, AuthProviders, AngularFire, FirebaseAuthState} from "angularfire2";
import {AuthMethod} from "./auth-method";
import {Injectable} from "@angular/core";

/**
 * Github firebase auth service
 */
@Injectable()
export class GithubAuth implements AuthMethod{

  /**
   * Name of auth method
   */
  name: string = 'Github';

  constructor(private firebase: AngularFire){
  }

  /**
   * Login method
   * @return {firebase.Promise<FirebaseAuthState>} promise with FirebaseAuthState
   */
  login(){
    return this.firebase.auth.login({
      provider: AuthProviders.Github,
      method: AuthMethods.Popup
    });
  }
}
