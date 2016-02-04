import React from 'react';
import {Provider} from 'react-redux';

import Routes from './routes/react';
import DevTools from './containers/dev-tools';
import ajax from './utils/ajax';

// let initialState = {
//   authedUser: {
//     username: 'hayleyhayz',
//     name: 'Hayley'
//   }
// }
//
// $.ajax({
//   type: 'GET',
//   url: '/api/polls',
//   async: false,
//   success: (res) => {
//     initialState = {
//       ...initialState,
//       polls: res.polls,
//       users: res.users
//     }
//   }
// });

const initialState = {
  polls: [{
    submitter: 'jimmybob',
    name: 'Do you like hand cream?',
    options: {
      yes: 0,
      no: 0
    },
    selectedOption: 'select'
  },{
    submitter: 'jimmybob',
    name: 'Whats the best way to jump?',
    options: {
      'with legs': 0,
      'with hands': 0
    },
    selectedOption: 'select'
  },{
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
      ownPolls: ['Do you like hand cream?', 'Whats the best way to jump?']
    },
    hayleyhayz: {
      ownPolls: ['How old are you?']
    }
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
