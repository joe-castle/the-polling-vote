'use strict';

import {createStore} from 'redux';

import setDbState from './data/set';
import getDbState from './data/get';

import rootReducer from './reducers/server-root-reducer';
import routes from './routes/express';

getDbState
  .then(initialState => {
    const store = createStore(rootReducer, initialState);
    const app = routes(store);
    const port = process.env.PORT || 3000;

    // store.subscribe(() => console.log('State:', store.getState()));
    store.subscribe(() => setDbState(store.getState()));

    app.listen(port, () =>
      console.log('Express server listening on port:', port)
    );
  });
