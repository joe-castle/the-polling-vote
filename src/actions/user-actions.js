import * as types from './action-types'

import {addAuthedUser} from '../actions/authed-user-actions';
import {clearSignupForm} from '../actions/signup-actions';

export const addUser = (username, name) => ({
  type: types.ADD_USER,
  username,
  name
});

export const addOwnPollID = (username, pollID) => ({
  type: types.ADD_OWN_POLL_ID,
  username,
  pollID
});

export const deleteOwnPollID = (username, pollID) => ({
  type: types.DELETE_OWN_POLL_ID,
  username,
  pollID
});

export const postAddUser = (history) => (
  (dispatch, getState) => {
    const {signupForm} = getState()
    // server access
      dispatch(addUser(signupForm.username, signupForm.name));
      dispatch(addAuthedUser(signupForm.username, signupForm.name));
      dispatch(clearSignupForm());
      history.push(`/users/${signupForm.username}`)
  }
);
