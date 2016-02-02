import * as types from './action-types';
import {addOwnPollID, deleteOwnPollID} from './user-actions';

import formatUrl from '../utils/format-url';

export const addPoll = (payload) => ({
  type: types.ADD_POLL,
  payload
});

export const postAddPoll = (username, payload, history) => (
  (dispatch, getState) => {
    const {polls} = getState();
    if (polls.length > 0) {
      payload.id = polls[polls.length-1].id + 1;
    } else {
      payload.id = 1;
    }
    // server access
      // on success
      dispatch(addPoll(payload));
      dispatch(addOwnPollID(username, payload.id));
      Materialize.toast(
        'Poll succesfully created! Redirecting in 2 seconds.',
        2000, '',
        function() {
          history.push(`/polls/${formatUrl(payload.name, true)}`)
        }
      );
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

export const postDeletePoll = (username, pollID) => (
  dispatch => {
    // server access
      dispatch(deletePoll(pollID));
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
