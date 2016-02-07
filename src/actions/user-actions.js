import * as types from './action-types'

import {addAuthedUser} from '../actions/authed-user-actions';
import {clearSignupForm} from '../actions/signup-actions';

import ajax from '../utils/ajax';

export const addUser = (username, name) => ({
  type: types.ADD_USER,
  username,
  name
});

export const addOwnPoll = (username, pollName) => ({
  type: types.ADD_OWN_POLL,
  username,
  pollName
});

export const deleteOwnPoll = (username, pollName) => ({
  type: types.DELETE_OWN_POLL,
  username,
  pollName
});

export const postAddUser = (username, name, password, history) => (
  dispatch => {
    ajax('POST', {username, name, password}, '/signup')
      .done(res => {
        dispatch(addUser(username, name));
        dispatch(addAuthedUser(username, name));
        dispatch(clearSignupForm());
        Materialize.toast(
          'User succesfully created! Redirecting...',
          1000, '',
          () => history.push(`/users/${username}`)
        )
      })
  }
);
