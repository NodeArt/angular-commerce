import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Route, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as fromRoot from '../app/reducers';
import * as fromAuth from 'a2c-auth/reducers';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromRoot.State>,
              private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.store
      .select(fromAuth.getLoggedIn)
      .do(console.log)
      .map(isAuthed => {
        if (!isAuthed) {
          this.router.navigateByUrl('/login');
          return false;
        }
        return true;
      })
      .first();
  }
}
