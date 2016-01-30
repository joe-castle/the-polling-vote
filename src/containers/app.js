import React from 'react';
import { connect } from 'react-redux';

import * as polls from '../actions/poll-actions';
import * as users from '../actions/user-actions';

import CounterButton from '../components/counter-button';

export const App = ({dispatch, counter}) => (
	<div className='container'>
    <h1>Hello World!!!</h1>
    <p>React Starter Project</p>
    <hr />
    <p>Testing Redux</p>
    <p>{counter}</p>
    <CounterButton
      onChangeClick={() => dispatch(polls.addPoll({
        submitter: 'jimjones',
        name: 'Another Poll Yo!',
        options: {
          maybe: 0, never: 0
        }
      }))}
      displayText='addPoll'
    />
    <CounterButton
      onChangeClick={() => dispatch(polls.editPoll(0, {
        submitter: 'jimmybob',
        name: 'Do you like hand cream?',
        options: {
          no: 2
        }
      }))}
      displayText='editPoll'
    />
    <CounterButton
      onChangeClick={() => dispatch(polls.deletePoll(0))}
      displayText='deletePoll'
    />
    <CounterButton
      onChangeClick={() => dispatch(polls.voteOnPoll(0, 'yes'))}
      displayText='voteOnPoll'
    />
    <br/>
    <CounterButton
      onChangeClick={() => dispatch(users.addUser('thewinnerofall', {
        name: 'Hayley',
        ownPolls: [],
        votedPolls: []
      }))}
      displayText='addUser'
    />
	</div>
);
export default connect(state => ({
		counter: state.counter
	})
)(App);
