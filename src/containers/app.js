import React from 'react';
import {connect} from 'react-redux';

import * as polls from '../actions/poll-actions';
import * as users from '../actions/user-actions';

import Navbar from '../components/navbar';

export const App = ({dispatch, counter}) => (
	<div className='container'>
    <Navbar/>
	</div>
);
export default connect(state => ({
		counter: state.counter
	})
)(App);
