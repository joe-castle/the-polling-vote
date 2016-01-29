import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/counter-actions';

import CounterButton from '../components/counter-button';

export const App = ({dispatch, counter}) => (
	<div className='container'>
    <h1>Hello World!</h1>
    <p>React Starter Project</p>
    <hr />
    <p>Testing Redux</p>
    <p>{counter}</p>
    <CounterButton
      onChangeClick={() => dispatch(actions.incrementValue())}
      displayText='+'
    />
    <CounterButton
      onChangeClick={() => dispatch(actions.decrementValue())}
      displayText='-'
    />
	</div>
);
export default connect(state => ({
		counter: state.counter
	})
)(App);
