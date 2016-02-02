import * as types from './action-types'

import {addAuthedUser} from '../actions/authed-user-actions';

export const addUser = (username, name) => ({
  type: types.ADD_USER,
  username,
  name
});

export const postAddUser = (payload) => (
  dispatch => {
    // server access
      dispatch(addUser(payload.username, payload.name));
      dispatch(addAuthedUser(payload.username));
  }
)

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
