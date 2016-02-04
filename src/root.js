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

const store = configureStore();

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
