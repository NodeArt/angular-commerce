import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from 'a2c-auth';
import {ProductsState} from 'a2c-products';

import * as fromLayout from '../core/reducers/layout';

export interface State {
  layout: fromLayout.State;
  products?: ProductsState;
  auth?: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.reducer,
};

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);
