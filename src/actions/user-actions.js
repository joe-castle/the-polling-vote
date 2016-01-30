import * as types from './action-types'

export const addUser = (username, payload) => ({
  type: types.ADD_USER,
  username,
  payload
})
