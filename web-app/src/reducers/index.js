import { combineReducers } from 'redux';
import orders from './orderReducer';
import auth from './loginReducer';
import fuelSavings from './fuelSavingsReducer';
import { routerReducer } from 'react-router-redux';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  auth,
  orders,
  ajaxCallsInProgress,
  fuelSavings,
  routing: routerReducer
});

export default rootReducer;
