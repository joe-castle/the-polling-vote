import React from 'react';
import { Provider } from 'react-redux';

import App from './containers/app';

import DevTools from './containers/dev-tools';

const initialState = {
  polls: [{
    submitter: 'jimmybob',
    name: 'Do you like hand cream?',
    options: {
      yes: 3,
      no: 2
    }
  }],
  users: {
    jimmybob: {
      name: 'Jim',
      ownPolls: [1],
      votedPolls: [1]
    }
  }
}

const store = configureStore(initialState);

if (process.env.NODE_ENV === 'production') {
  module.exports = () => (
  	<Provider store={store}>
      <App />
  	</Provider>
  );
} else {
  module.exports = () => (
  	<Provider store={store}>
      <div>
        <App />
        <DevTools />
      </div>
  	</Provider>
  );
}
