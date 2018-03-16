import React from 'react';  
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';  
import * as actions from '../../actions/loginActions'
import LoginForm from '../LoginForm';

class LoginPage extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {credentials: {username: '', password: ''}}
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.login(this.state.credentials);
  }

  render() {
    return (
      <div>
        <LoginForm 
          username={this.state.credentials.username} 
          password={this.state.credentials.password} 
          message={this.props.message} 
          onChange={this.onChange} 
          onSave={this.onSave} />
      </div>
  );
  }
}

LoginPage.propTypes = {
  message: PropTypes.string,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    message: state.auth.message
  };
}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);