'use strict';

import {createStore} from 'redux';

import rootReducer from './reducers/server-root-reducer';
import routes from './routes/express';

const initialState = {
  polls: [{
    id: 1,
    submitter: 'jimmybob',
    name: 'Do you like hand cream?',
    options: {
      yes: 0,
      no: 0
    },
    selectedOption: 'select'
  },{
    id: 2,
    submitter: 'jimmybob',
    name: 'Whats the best way to jump?',
    options: {
      'with legs': 0,
      'with hands': 0
    },
    selectedOption: 'select'
  },{
    id: 3,
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
      ownPolls: [1, 2]
    },
    hayleyhayz: {
      ownPolls: [3]
    }
  }
}

const store = createStore(rootReducer, initialState);
const app = routes(store);
const port = process.env.PORT || 3000;

store.subscribe(() => console.log('State:', store.getState()));

app.listen(port, () =>
  console.log('Express server listening on port:', port)
);

// React-Hot-Reload Server. For development only.
// if (process.env.NODE_ENV !== 'production') {
//   require('../webpack/webpack.devserver');
// }
