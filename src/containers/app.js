import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/poll-actions';

import CounterButton from '../components/counter-button';

export const App = ({dispatch, counter}) => (
	<div className='container'>
    <h1>Hello World!!!</h1>
    <p>React Starter Project</p>
    <hr />
    <p>Testing Redux</p>
    <p>{counter}</p>
    <CounterButton
      onChangeClick={() => dispatch(actions.addPoll({
        submitter: 'jimjones',
        name: 'Another Poll Yo!',
        options: {
          maybe: 0, never: 0
        }
      }))}
      displayText='addPoll'
    />
    <CounterButton
      onChangeClick={() => dispatch(actions.editPoll(0, {
        submitter: 'jimmybob',
        name: 'Do you like hand cream?',
        options: {
          no: 2
        }
      }))}
      displayText='editPoll'
    />
    <CounterButton
      onChangeClick={() => dispatch(actions.deletePoll(0))}
      displayText='deletePoll'
    />
    <CounterButton
      onChangeClick={() => dispatch(actions.voteOnPoll(0, 'yes'))}
      displayText='voteOnPoll'
    />
	</div>
);
export default connect(state => ({
		counter: state.counter
	})
)(App);
