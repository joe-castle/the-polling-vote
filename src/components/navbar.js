import React from 'react';

export default ({baseColor}) => (
  <header>
    <nav className={baseColor}>
      <div className='container'>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo'>The Polling Vote</a>
          <ul className='right hide-on-med-and-down'>
            <li><a href='#'>Signup</a></li>
            <li><a href='#'>Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
)
