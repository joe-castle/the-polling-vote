import * as types from './action-types'

import {addAuthedUser} from '../actions/authed-user-actions';
import {clearSignupForm} from '../actions/signup-actions';

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
    // server access
      dispatch(addUser(username, name));
      dispatch(addAuthedUser(username, name));
      dispatch(clearSignupForm());
      history.push(`/users/${username}`)
  }
);
