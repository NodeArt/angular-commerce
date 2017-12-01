import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from 'a2c-auth';
import {ProductsState} from 'a2c-products';

import * as fromLayout from '../core/reducers/layout';
import * as fromLogin from '../core/reducers/login';

export interface State {
  layout: fromLayout.State;
  login: fromLogin.State;
  products?: ProductsState;
  auth?: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
  login: fromLogin.reducer,
};

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);

export const getLoginState = createFeatureSelector<fromLogin.State>('login');

export const getLoginError = createSelector(
  getLoginState,
  fromLogin.getError
);

export const getLoginPending = createSelector(
  getLoginState,
  fromLogin.getPending
);
