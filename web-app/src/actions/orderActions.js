import * as types from '../constants/actionTypes';
import orderApi from '../api/orderApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import { updateTotal } from '../utils/orderHelpers';

export function loadOrdersSuccess(orders) {
  return { type: types.LOAD_ORDERS_SUCCESS, orders};
}

export function createOrderRequest() {
  return {type: types.CREATE_ORDER_REQUEST};
}

export function createOrderSuccess(order) {
  return {type: types.CREATE_ORDER_SUCCESS, order};
}

export function updateOrderRequest(order) {
  return {type: types.UPDATE_ORDER_REQUEST, order};
}

export function updateOrderSuccess(order) {
  return {type: types.UPDATE_ORDER_SUCCESS, order};
}

export function loadOrders() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return orderApi.getAllOrders().then(orders => {
      dispatch(loadOrdersSuccess(updateTotal(orders)));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveOrder(order) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    let currentId = order.id;
    return orderApi.saveOrder(order).then(order => {
      currentId ? dispatch(updateOrderSuccess(order)) :
        dispatch(createOrderSuccess(order));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
