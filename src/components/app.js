import React from 'react';

import * as polls from '../actions/poll-actions';
import * as users from '../actions/user-actions';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default ({
  children
}) => {
  let baseColor = 'indigo';
  return (
    <div className='wrapper'>
      <Navbar baseColor={baseColor}/>
      {children}
      <Footer baseColor={baseColor}/>
    </div>
  )
};
