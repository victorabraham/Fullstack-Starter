import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function loginReducer(state =  initialState.auth, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, {isAuthenticated: false});
    
    case types.LOGIN_SUCCESS:
      return Object.assign({}, {isAuthenticated: true, token: action.token, user: action.user});

    case types.LOGIN_FAILURE:
      return Object.assign({}, {isAuthenticated: false, message: action.message});

    default:
      return state;
  }
}
