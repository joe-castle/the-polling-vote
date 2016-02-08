import React, {cloneElement} from 'react';
import {connect} from 'react-redux';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Preloader from '../components/preloader';

const App = ({
  children,
  location,
  isFetching
}) => {
  let baseColor = 'indigo';
  return (
    <div className='wrapper'>
      <Navbar location={location} baseColor={baseColor}/>
      <main>
        {cloneElement(children, {baseColor})}
      </main>
      <Footer baseColor={baseColor}/>
      {isFetching && <Preloader />}
    </div>
  )
};

export default connect(
  state => ({isFetching: state.isFetching})
)(App);
