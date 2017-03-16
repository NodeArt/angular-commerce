import {NgModule} from "@angular/core";
import {FirebaseConnector} from "./firebase-connector";
import {GoogleAuth} from "./authMethods/google";
import {GithubAuth} from "./authMethods/github";
import {FacebookAuth} from "./authMethods/facebook";
import {PasswordAuth} from "./authMethods/password";
import {TwitterAuth} from "./authMethods/twitter";
import {AnonymouslyAuth} from "./authMethods/anonymously";

/**
 * Firebase connector module
 */
@NgModule({
  providers: [
    FirebaseConnector,
    GoogleAuth,
    GithubAuth,
    FacebookAuth,
    PasswordAuth,
    TwitterAuth,
    AnonymouslyAuth
  ]
})
export class FirebaseConnectorModule {
  
}
