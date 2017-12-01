import * as auth from 'a2c-auth-actions';
import {User} from 'a2c-auth-interface';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
};

export const events: { [key: string]: Function } = {
  [auth.LOGIN_SUCCESS]: (state: State, action: auth.LoginSuccess): State => {
    return {
      ...state,
      loggedIn: true,
      user: action.payload,
    };
  },

  [auth.LOGOUT_SUCCESS]: (state: State, action: auth.Logout): State => {
    return initialState;
  }
};

export function reducer(state = initialState, action: auth.Actions): State {
  if (!events[action.type]) {
    return state;
  }
  return events[action.type](...Array.from(arguments));
}
