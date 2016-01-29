import { createStore, compose } from 'redux';

import rootReducer from '../reducers/root-reducer';
import DevTools from '../containers/dev-tools';

if (process.env.NODE_ENV === 'production') {
  const finalCreateStore = compose()(createStore);

  module.exports = (initialState) => (
    finalCreateStore(rootReducer, initialState)
  );
} else {
  const finalCreateStore = compose(
    // midleware before DevTools
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
