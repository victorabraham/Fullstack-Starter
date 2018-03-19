import React from 'react';
import PropTypes from 'prop-types';
import TextInput from './common/TextInput';  

// Since this component is simple and static, there's no parent container for it.
const LoginForm = ({username, password, message, onChange, onSave}) => {
  return (
    <div>
      <h2 className="alt-header">Login</h2>
      {message}
      <form>
          <TextInput
            name="username"
            label="username"
            value={username}
            onChange={onChange}/>

          <TextInput
            name="password"
            label="password"
            type="password"
            value={password}
            onChange={onChange}/>

          <input
            type="submit"
            className="btn btn-primary"
            onClick={onSave}/>
        </form>
        
    </div>
  );
};

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default LoginForm;
