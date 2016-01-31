import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import useQueries from 'history/lib/useQueries';
import useBasename from 'history/lib/useBasename';

let history = useQueries(useBasename(createBrowserHistory))({queryKey: false});

import App from '../components/app';
import Polls from '../containers/polls';
import Poll from '../components/poll';

export default () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Polls}/>
      <Route path='polls' component={Polls}>
        <Route path=':poll' component={Poll}/>
      </Route>
    </Route>
  </Router>
);
