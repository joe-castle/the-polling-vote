import {history} from '../routes/react';

import {isFetching} from '../actions/is-fetching-actions';
import {removeAuthedUser} from '../actions/authed-user-actions';

import store from '../store';

export default (type, payload, url = '/api/polls', dataType = 'json') => (
  $.ajax({
    type: type,
    url: url,
    contentType: 'application/json',
    data: JSON.stringify(payload),
    dataType: dataType
  })
  .fail(err => {
    store.dispatch(isFetching(false));
    if (err.status === 401) {
      Materialize.toast(`${err.responseText}. Redirecting...`, 1000, '', () => {
        dispatch(removeAuthedUser());
        history.push('/login')
      });
    } else {
      Materialize.toast(err.responseText, 4000);
    }
  })
)
