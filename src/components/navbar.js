import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classNames from 'classNames';

import {removeAuthedUser} from '../actions/authed-user-actions';

const Navbar = ({
  name,
  username,
  baseColor,
  removeAuthedUser
}, {location}) => (
  <header>
    <nav className={baseColor}>
      <div className='container'>
        <div className='nav-wrapper'>
          <Link to='/' className='left brand-logo'>The Polling Vote</Link>
          <ul className='right hide-on-med-and-down'>
            <li className={classNames({active: /\/polls/i.test(location.pathname)})}>
              <Link to='/polls'>Polls</Link>
            </li>
            <li className={classNames({active: /\/users/i.test(location.pathname)})}>
              <Link to='/users'>Users</Link>
            </li>
            {!username && <span><li className={classNames({active: location.pathname === '/signup'})}>
              <Link to='/signup'>Signup</Link>
            </li>
            <li className={classNames({active: location.pathname === '/login'})}>
              <Link to='/login'>Login</Link>
            </li></span>}
            {username && <span><li>
              <Link to={`/users/${username}`}>{`Hello ${name}`}</Link>
            </li>
            <li>
              <Link onClick={() => removeAuthedUser()} to='/'>Logout</Link>
            </li></span>}
          </ul>
        </div>
      </div>
    </nav>
  </header>
);
Navbar.contextTypes = {
  location: PropTypes.object
}

export default connect(
  state => ({
    users: state.users,
    username: state.authedUser.username,
    name: state.authedUser.name
  }),
  {removeAuthedUser}
)(Navbar);
