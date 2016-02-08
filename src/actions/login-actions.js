import * as types from './action-types';

import {isFetching} from '../actions/is-fetching-actions';
import {addAuthedUser} from './authed-user-actions';

import {history} from '../routes/react';
import ajax from '../utils/ajax';

export const changeLoginUsername = (value) => ({
  type: types.CHANGE_LOGIN_USERNAME,
  value
});

export const changeLoginPassword = (value) => ({
  type: types.CHANGE_LOGIN_PASSWORD,
  value
});

export const clearLoginForm = () => ({
  type: types.CLEAR_LOGIN_FORM
})

export const loginUser = (username, password) => (
  dispatch => {
    dispatch(isFetching(true));
    ajax('POST', {username, password}, '/login')
      .then(res => {
        dispatch(isFetching(false));
        dispatch(addAuthedUser(res.username, res.name));
        dispatch(clearLoginForm());
        Materialize.toast(
          'Login successful! Redirecting',
          1000, '',
          () => history.push(`/users/${res.username}`)
        );
      })
      .fail(err => {
        Materialize.toast('Username or password incorrect, please try again', 4000);
      })
  }
)
