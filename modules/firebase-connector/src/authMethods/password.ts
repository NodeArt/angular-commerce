import { AngularFireAuth } from "angularfire2/auth";
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

  constructor(private afAuth: AngularFireAuth){
  }

  /**
   * Login method
   * @return {firebase.Promise<FirebaseAuthState>} promise with FirebaseAuthState
   */
  login(email, password): firebase.Promise<any>{
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
