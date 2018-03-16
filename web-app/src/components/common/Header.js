import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeStyle = { color: 'blue' };
  return (
    <div>
      <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
      {' | '}
      <NavLink to="/fuel-savings" activeStyle={activeStyle}>Demo App</NavLink>
      {' | '}
      <NavLink to="/orders" activeStyle={activeStyle}>Orders</NavLink>
      {' | '}
      <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
      {' | '}
      <NavLink to="/login" activeStyle={activeStyle}>Login</NavLink>
      {' | '}
      <NavLink to="/user" activeStyle={activeStyle}>User</NavLink>
      {' | '}
      <NavLink to="/admin" activeStyle={activeStyle}>Admin</NavLink>
      {' | '}
      <NavLink to="/super-admin" activeStyle={activeStyle}>SuperAdmin</NavLink>
    </div>
  );
};

export default Header;