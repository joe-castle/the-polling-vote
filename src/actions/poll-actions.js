import * as types from './action-types';
import {addOwnPollID, deleteOwnPollID} from './user-actions';

export const addPoll = (payload) => ({
  type: types.ADD_POLL,
  payload
});

export const postAddPoll = (username, pollID, payload) => (
  dispatch => {
    // server access
      dispatch(addPoll(payload));
      dispatch(addOwnPollID(username, pollID));
  }
);

export const editPoll = (pollID, payload) => ({
  type: types.EDIT_POLL,
  pollID,
  payload
});

export const postEditPoll = (username, pollID, payload) => (
  dispatch => {
    // server access
      dispatch(editPoll(pollID, payload));
  }
);

export const deletePoll = (pollID) => ({
  type: types.DELETE_POLL,
  pollID
});

export const postDeletePoll = (username, pollID, payload) => (
  dispatch => {
    // server access
      dispatch(deletePoll(pollID, payload));
      dispatch(deleteOwnPollID(username, pollID));
  }
);

export const voteOnPoll = (pollID, option) => ({
  type: types.VOTE_ON_POLL,
  pollID,
  option
});

export const postVoteOnPoll = (username, pollID, option) => (
  dispatch => {
    // server access
      dispatch(voteOnPoll(pollID, option));
  }
);
