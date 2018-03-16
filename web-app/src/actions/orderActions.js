import * as types from '../constants/actionTypes';
import orderApi from '../api/orderApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadOrdersSuccess(orders) {
  return { type: types.LOAD_ORDERS_SUCCESS, orders};
}

export function createOrderSuccess(order) {
  return {type: types.CREATE_ORDER_SUCCESS, order};
}

export function updateOrderSuccess(order) {
  return {type: types.UPDATE_ORDER_SUCCESS, order};
}

export function loadOrders() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return orderApi.getAllOrders().then(orders => {
      dispatch(loadOrdersSuccess(orders));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveOrder(order) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return orderApi.saveOrder(order).then(order => {
      order.id ? dispatch(updateOrderSuccess(order)) :
        dispatch(createOrderSuccess(order));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
