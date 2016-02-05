import * as types from './action-types'

export const addAuthedUser = (username, name) => ({
  type: types.ADD_AUTHED_USER,
  username,
  name
});

export const removeAuthedUser = () => ({
  type: types.REMOVE_AUTHED_USER
});

export const logoutUser = () => (
  dispatch => {

    dispatch(removeAuthedUser());
  }
)
