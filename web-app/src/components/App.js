/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from 'material-ui/CssBaseline';
import HomePage from './HomePage';
import FuelSavingsPage from './containers/FuelSavingsPage';
import OrdersPage from './containers/OrdersPage';
import AboutPage from './AboutPage';
import LoginPage from './containers/LoginPage';
import NotFoundPage from './NotFoundPage';
import Template from './common/Template';
import Authorization from './common/Authorization';
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const User = Authorization(['user', 'admin', 'superAdmin']);
const Admin = Authorization(['admin', 'superAdmin']);
const SuperAdmin = Authorization(['superAdmin']);

class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <Template>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/fuel-savings" component={FuelSavingsPage} />
          <Route path="/orders" component={OrdersPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/user" component={User(AboutPage)} />
          <Route path="/admin" component={Admin(AboutPage)} />
          <Route path="/super-admin" component={SuperAdmin(AboutPage)} />
          <Route path="/login" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
        </Template>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
