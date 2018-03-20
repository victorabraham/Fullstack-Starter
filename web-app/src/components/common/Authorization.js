import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/**
 * HOC that Handles whether or not the user is allowed to see the page.
 * @param {array} allowedRoles - user roles that are allowed to see the page.
 * @returns {React.Component}
 */
export default function Authorization(allowedRoles) {
  return WrappedComponent => {
    class WithAuthorization extends React.Component {

      constructor(props) {
        super(props);
      }

      render() {
        const { auth } = this.props;
        if (auth && auth.user && allowedRoles.includes(auth.user.role)) {
          return <WrappedComponent {...this.props} />;
        } else {
          return <h1>You are not allowed to access this page</h1>;
        }
      }

      static propTypes = {
        auth: PropTypes.object,
      };
    }

    function mapStateToProps(state) {
      return {
        auth: state.auth
      };
    }

    return connect(mapStateToProps)(WithAuthorization);
  };
}