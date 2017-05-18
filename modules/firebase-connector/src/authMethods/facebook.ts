import { AngularFireAuth } from 'angularfire2/auth';
import {AuthMethod} from "./auth-method";
import {Injectable, Inject} from "@angular/core";

import * as firebase from 'firebase/app';

/**
 * Facebook firebase auth service
 */
@Injectable()
export class FacebookAuth implements AuthMethod{

  /**
   * Name of auth method
   */
  name: string = 'Facebook';

  constructor(private afAuth: AngularFireAuth){
  }

  /**
   * Login method
   * @return {firebase.Promise<FirebaseAuthState>} promise with FirebaseAuthState
   */
  login(): firebase.Promise<any>{
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
}