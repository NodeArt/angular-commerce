import { SessionFlow } from '@nodeart/session-flow';
import {Injectable, NgZone} from "@angular/core";
import {DbAbstractionLayer} from "@nodeart/dal";
/**
 * Service that provide user data and methods to work with auth
 */
@Injectable()
export class AuthService {
  
  /**
   * User data
   */
  userData = {};
  constructor(protected dal: DbAbstractionLayer, protected sessionFlow: SessionFlow, protected zone: NgZone){
    this.dal.getAuth().onAuthStateChanged(authData => {
      if(authData === null){
        this.sessionFlow.userId = 'guest';
        this.userData = {};
        this.dal.initializeBasketHistory(sessionFlow.deviceId);
      }
      if(authData){
        let uid = authData.uid;
        this.userData = {};
        this.userData['uid'] = uid;
        this.dal.getUserData(uid).subscribe( data => {
          if(data.val()){
            let userData = data.val()[0]['_source'];
            userData.userId = data.val()[0]['_id'];
            this.sessionFlow.userId = data.val()[0]['_id'];
            this.dal.initializeBasketHistory(userData.userId);
            this.zone.run(() => {
              this.userData = userData;
            });
          }
        });
      }
    });
  }


  /**
   * Logout method
   */
  logout(){
    return this.dal.logout();
  }

  /**
   * Register user
   * @param registerForm
   * @returns {Object} userData 
   */
  register(registerForm){
    return this.dal.registerUser(registerForm);
  }

  /**
   * Login with email and password
   * @param email user email
   * @param password user password
   * 
   * @returns user data
   */
  login(email, password){
    return this.dal.loginEmail(email, password);
  }

  /**
   * Reset user password
   * @param email user email
   * @returns Promise containing null
   */
  resetPassword(email) {
    return this.dal.resetPassword(email);
  }
}
