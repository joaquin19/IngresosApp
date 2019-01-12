
import * as fromAuth from './auth.accions';
import { User } from './user.model';

export interface AuthState {
  user: User;
}

const initState: AuthState = {
  user: null
};

export function authReducer( state = initState, action: fromAuth.acciones): AuthState {

  switch(action.type) {

    case fromAuth.SET_USER:
      return {
        user: { ...action.user }
      };
    case fromAuth.UNSET_USER:
      return {
        user: null
      };

    default:
      return state;
  }
}



