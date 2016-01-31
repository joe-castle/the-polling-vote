import React from 'react';
import {connect} from 'react-redux';

import * as polls from '../actions/poll-actions';
import * as users from '../actions/user-actions';

import Navbar from '../components/navbar';
import Content from '../components/content';
import Footer from '../components/footer';

export const App = ({dispatch, counter}) => (
	<div>
    <Navbar/>
    <Content/>
    <Footer/>
	</div>
);
export default connect(state => ({
		counter: state.counter
	})
)(App);
