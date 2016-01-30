import * as types from './action-types'

export const addPoll = (payload) => ({
  type: types.ADD_POLL,
  payload
})

export const editPoll = (pollID, payload) => ({
  type: types.EDIT_POLL,
  pollID,
  payload
});

export const deletePoll = (pollID) => ({
  type: types.DELETE_POLL,
  pollID
})

export const voteOnPoll = (pollID, option) => ({
  type: types.VOTE_ON_POLL,
  pollID,
  option
})
