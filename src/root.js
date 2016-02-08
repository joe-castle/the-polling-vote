import React from 'react';
import {Provider} from 'react-redux';

import Routes from './routes/react';
import DevTools from './containers/dev-tools';
import ajax from './utils/ajax';

let initialState = window.__INITIAL_STATE__;
if (initialState.polls) {initialState.polls = initialState.polls.map(x => ({
  ...x,
  selectedOption: 'select'
}))}

export const store = configureStore(initialState);

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
