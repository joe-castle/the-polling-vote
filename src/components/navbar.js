import React from 'react';
import {Link} from 'react-router';

export default ({baseColor}) => (
  <header>
    <nav className={baseColor}>
      <div className='container'>
        <div className='nav-wrapper'>
          <Link to='/' className='left brand-logo'>The Polling Vote</Link>
          <ul className='right hide-on-med-and-down'>
            <li><Link to='/polls'>Polls</Link></li>
            <li><Link to='/users'>Users</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);
