import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromAuth from './auth';

export interface AuthState {
  status: fromAuth.State;
}

export const reducers = {
  status: fromAuth.reducer
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  (state: fromAuth.State) => state.loggedIn
);

export const getUser = createSelector(
  selectAuthStatusState,
  (state: fromAuth.State) => state.user
);
