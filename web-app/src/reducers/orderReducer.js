import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function orderReducer(state = initialState.orders, action) {
  switch (action.type) {
    case types.LOAD_ORDERS_SUCCESS:
      return action.orders;

    case types.CREATE_ORDER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.order)
      ];

    case types.UPDATE_ORDER_SUCCESS:
      return [
        ...state.filter(order => order.id !== action.order.id),
        Object.assign({}, action.order)
      ];

    default:
      return state;
  }
}
