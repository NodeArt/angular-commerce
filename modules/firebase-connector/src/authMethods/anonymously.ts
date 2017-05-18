import { AngularFireAuth } from "angularfire2/auth";
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

  constructor(private afAuth: AngularFireAuth){
  }

  /**
   * Login method
   * @returns {firebase.Promise<FirebaseAuthState>} promise with FirebaseAuthState
   */
  login(): firebase.Promise<any>{
    return this.afAuth.auth.signInAnonymously();
  }
}
