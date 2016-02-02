import React from 'react';
import {Provider} from 'react-redux';

import Routes from './routes/react-routes';
import DevTools from './containers/dev-tools';

const initialState = {
  polls: [{
    id: 1,
    submitter: 'jimmybob',
    name: 'Do you like hand cream?',
    options: {
      yes: 0,
      no: 0
    },
    selectedOption: 'select'
  },{
    id: 2,
    submitter: 'jimmybob',
    name: 'Whats the best way to jump?',
    options: {
      'with legs': 0,
      'with hands': 0
    },
    selectedOption: 'select'
  },{
    id: 3,
    submitter: 'hayleyhayz',
    name: 'How old are you?',
    options: {
      '0 - 5': 0,
      '6 - 11': 0,
      '12 - 17': 0,
      '18 - 24': 0,
      '25+': 0
    },
    selectedOption: 'select'
  }],
  users: {
    jimmybob: {
      ownPolls: [1, 2]
    },
    hayleyhayz: {
      ownPolls: [3]
    }
  },
  authedUser: {
    username: 'hayleyhayz',
    name: 'Hayley'
  }
}

const store = configureStore(initialState);

if (process.env.NODE_ENV === 'production') {
  module.exports = () => (
  	<Provider store={store}>
      <Routes/>
  	</Provider>
  );
} else {
  module.exports = () => (
  	<Provider store={store}>
      <div>
        <Routes/>
        <DevTools/>
      </div>
  	</Provider>
  );
}
