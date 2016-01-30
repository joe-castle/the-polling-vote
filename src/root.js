import React from 'react';
import { Provider } from 'react-redux';

import App from './containers/app';

import DevTools from './containers/dev-tools';

const initialState = {
  polls: [{
    submitter: 'jimmybob',
    name: 'Do you like hand cream?',
    options: {
      yes: 0,
      no: 0
    }
  }],
  users: {
    jimmybob: {
      name: 'Jim',
      ownPolls: [0]
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
