import { history } from '../store/configureStore';
import { jwtDecode } from '../utils/jwtHelpers';
import * as types from '../constants/actionTypes';
import orderApi from '../api/orderApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loginRequest(credentials) {
  localStorage.removeItem('vsid');
  return { type: types.LOGIN_REQUEST, credentials};
}

export function loginSuccess(token, user) {
  return {type: types.LOGIN_SUCCESS, token, user};
}

export function loginError(message) {
  return {type: types.LOGIN_FAILURE, message};
}

export function logoutSuccess() {
  return {type: types.LOGOUT_SUCCESS};
}

export function findSavedAuthSession() {
  const token = localStorage.getItem('vsid');
  if (token) {
    const decodedToken = jwtDecode(token);
    const isStillValid = decodedToken.exp > Date.now() / 1000;
    return isStillValid ? Object.assign(decodedToken, {role: 'admin'}) : false;
  }
  return false
}

export function login(credentials) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(loginRequest(credentials));
    return orderApi.login(credentials).then(result => {
      localStorage.setItem('vsid', result.token);
      history.push('/dashboard');
      dispatch(loginSuccess(result.token, Object.assign(jwtDecode(result.token), {role: 'admin'})));
    }).catch(error => {
      dispatch(loginError(error.message));
      dispatch(ajaxCallError());
    });
  };
}

