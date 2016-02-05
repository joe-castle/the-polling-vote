import React from 'react';
import {Provider} from 'react-redux';

import Routes from './routes/react';
import DevTools from './containers/dev-tools';
import ajax from './utils/ajax';

const store = configureStore(window.__INITIAL_STATE__);

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
