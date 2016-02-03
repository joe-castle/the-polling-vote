import React, {cloneElement} from 'react';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default ({
  children,
  location
}) => {
  let baseColor = 'indigo';
  return (
    <div className='wrapper'>
      <Navbar location={location} baseColor={baseColor}/>
      {cloneElement(children, {baseColor})}
      <Footer baseColor={baseColor}/>
    </div>
  )
};
