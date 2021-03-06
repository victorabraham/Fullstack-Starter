/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
import configureStore, { history } from './store/configureStore';
import { loginSuccess, loginError, findSavedAuthSession } from './actions/loginActions'
import Root from './components/Root';
import {loadOrders} from './actions/orderActions';
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
require('./favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore();
store.dispatch(loadOrders());

const authSession = findSavedAuthSession()
if (authSession) {
  store.dispatch(loginSuccess(localStorage.getItem('vsid'), authSession))
} else {
  store.dispatch(loginError('Session Expired'));
}

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
