import React from 'react';
import {Link} from 'react-router';

export default ({baseColor}) => (
  <header>
    <nav className={baseColor}>
      <div className='container'>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo'>The Polling Vote</Link>
          <ul className='right hide-on-med-and-down'>
            <li><a href='#'>Signup</a></li>
            <li><a href='#'>Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);
