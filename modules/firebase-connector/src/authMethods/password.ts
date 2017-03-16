import {AuthMethods, AuthProviders, AngularFire, FirebaseAuthState} from "angularfire2";
import {AuthMethod} from "./auth-method";
import {Injectable} from "@angular/core";

/**
 * Password firebase auth (with email and password) service
 */
@Injectable()
export class PasswordAuth implements AuthMethod{

  /**
   * Name of auth method
   */
  name: string = 'Password';

  constructor(private firebase: AngularFire){
  }

  /**
   * Login method
   * @return {firebase.Promise<FirebaseAuthState>} promise with FirebaseAuthState
   */
  login(email, password){
    return this.firebase.auth.login(
      {
        email: email,
        password: password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }
    );
  }
}
