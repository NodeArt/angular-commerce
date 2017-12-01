import {ModuleWithProviders, NgModule, Type} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './reducers/index';
import {AuthEffects} from './effects/auth.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class AuthModule {
  static forRoot(effectClass?: Type<AuthEffects>): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: AuthEffects, useClass: !!effectClass ? effectClass : AuthEffects }
      ]
    };
  }
}
