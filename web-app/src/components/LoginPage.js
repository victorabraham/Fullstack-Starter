import React from 'react';  
import PropTypes from 'prop-types';
import TextInput from './common/TextInput';  
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux';  
import * as actions from '../actions/loginActions'

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
        <form>
          <TextInput
            name="username"
            label="username"
            value={this.state.credentials.username}
            onChange={this.onChange}/>

          <TextInput
            name="password"
            label="password"
            type="password"
            value={this.state.credentials.password}
            onChange={this.onChange}/>

          <input
            type="submit"
            className="btn btn-primary"
            onClick={this.onSave}/>
        </form>
      </div>
  );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
export default connect(null, mapDispatchToProps)(LoginPage);