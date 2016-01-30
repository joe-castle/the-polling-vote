import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import rootReducer from '../reducers/root-reducer';
import DevTools from '../containers/dev-tools';

if (process.env.NODE_ENV === 'production') {
  const finalCreateStore = compose(
    applyMiddleware(thunk)
  )(createStore);

  module.exports = (initialState) => (
    finalCreateStore(rootReducer, initialState)
  );
} else {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
  )(createStore);

  module.exports = (initialState) => {
    const store = finalCreateStore(rootReducer, initialState);
    if (module.hot) {
      module.hot.accept('../reducers/root-reducer', () =>
        store.replaceReducer(require('../reducers/root-reducer'))
      );
    }
    return store;
  }
}
