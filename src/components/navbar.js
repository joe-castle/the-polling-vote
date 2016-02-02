import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import classNames from 'classNames';

const Navbar = ({baseColor}, {location}) => (
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
            <li className={classNames({active: location.pathname === '/signup'})}>
              <Link to='/signup'>Signup</Link>
            </li>
            <li className={classNames({active: location.pathname === '/login'})}>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);
Navbar.contextTypes = {
  location: PropTypes.object
}

export default Navbar;
