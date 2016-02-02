import * as types from './action-types'

export const addAuthedUser = (username) => ({
  type: types.ADD_AUTHED_USER,
  username
});
