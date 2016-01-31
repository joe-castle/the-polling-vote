import React from 'react';
import {connect} from 'react-redux';

import * as polls from '../actions/poll-actions';
import * as users from '../actions/user-actions';

import Navbar from '../components/navbar';
import Content from '../components/content';
import Footer from '../components/footer';

export const App = ({
  dispatch,
  children,
  baseColor,
  polls,
  users
}) => (
	<div className='wrapper'>
    <Navbar baseColor={baseColor}/>
    <Content polls={polls}/>
    <Footer baseColor={baseColor}/>
	</div>
);
export default connect(state => ({
    baseColor: 'indigo',
		polls: state.polls,
    users: state.users
	})
)(App);
