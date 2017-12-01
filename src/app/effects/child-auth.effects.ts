import {Inject, Injectable, NgZone, Optional} from '@angular/core';
import {AuthEffects} from 'a2c-auth';
import {Actions, Effect} from '@ngrx/effects';
import {Router} from '@angular/router';

import * as auth from 'a2c-auth-actions';
import {IAuth} from 'a2c-auth-interface';

@Injectable()
export class ChildAuthEffects extends AuthEffects {

  @Effect()
  protected loginWithEmail$;

  @Effect()
  protected loginWithFacebook$;

  @Effect()
  protected loginWithGoogle$;

  @Effect()
  protected registerWithEmail$;

  @Effect()
  protected logout$;

  constructor(protected actions$: Actions,
              @Optional() @Inject('IAuth') protected authService: IAuth,
              protected router: Router,
              protected ngZone: NgZone) {
    super(actions$, authService);
  }

  @Effect({ dispatch: false })
  protected loginRedirect$ = this.actions$
    .ofType(auth.LOGIN_SUCCESS)
    // TODO: Find reason why view does not update after oauth -> Remove ngZone
    .do(() => this.ngZone.run(() => this.router.navigate(['/'])));

}
