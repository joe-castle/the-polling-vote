import * as types from './action-types'

export const addUser = (username, payload) => ({
  type: types.ADD_USER,
  username,
  payload
});

export const postAddUser = (username, payload) => (
  dispatch => {
    // server access
      dispatch(addUser(username, payload));
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
