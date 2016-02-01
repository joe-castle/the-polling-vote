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
            <li><a href='#'>Signup</a></li>
            <li><a href='#'>Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);
