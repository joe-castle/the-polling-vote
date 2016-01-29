import React from 'react';
import { Provider } from 'react-redux';

import App from './containers/app';

import DevTools from './containers/dev-tools';

const store = configureStore();

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
