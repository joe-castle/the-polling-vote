import * as types from './action-types';
import {addOwnPollID, deleteOwnPollID} from './user-actions';
import {clearPollForm} from './poll-form-actions';

import formatUrl from '../utils/format-url';
import createPayload from '../utils/create-payload';
import ajax from '../utils/ajax';

export const addPoll = (payload) => ({
  type: types.ADD_POLL,
  payload
});

export const postAddPoll = (history) => (
  (dispatch, getState) => {
    let {polls, authedUser, pollForm} = getState()
      , pollID = polls.length > 0 ? polls[polls.length-1].id + 1 : 1;

    let payload = createPayload(
      pollID, authedUser.username, pollForm.name, pollForm.options, {}
    );
    ajax('POST', '/api/polls', payload)
      .done(res => {
        dispatch(addPoll(res));
        dispatch(addOwnPollID(authedUser.username, res.id));
        dispatch(clearPollForm());
        Materialize.toast(
          'Poll succesfully created! Redirecting...',
          1000, '',
          () => history.push(`/polls/${formatUrl(payload.name, true)}`)
        );
      })
      .fail(err => {
        Materialize.toast(err.responseText, 4000);
      });
  }
);

export const editPoll = (pollID, payload) => ({
  type: types.EDIT_POLL,
  pollID,
  payload
});

export const postEditPoll = (history) => (
  (dispatch, getState) => {
    let {authedUser, pollForm, polls} = getState()
      , {id, options} = polls.find(x => x.name === pollForm.name)
      , payload = createPayload(
          id, authedUser.username, pollForm.name, pollForm.options, options
        );
    // server access
      dispatch(editPoll(payload.id, payload));
      dispatch(clearPollForm());
      Materialize.toast(
        'Poll succesfully edited! Redirecting...',
        1000, '',
        () => history.push(`/polls/${formatUrl(payload.name, true)}`)
      );
  }
);

export const deletePoll = (pollID) => ({
  type: types.DELETE_POLL,
  pollID
});

export const postDeletePoll = (pollID) => (
  (dispatch, getState) => {
    const {authedUser} = getState();
    // server access
      dispatch(deletePoll(pollID));
      dispatch(deleteOwnPollID(authedUser.username, pollID));
  }
);

export const voteOnPoll = (pollID, option) => ({
  type: types.VOTE_ON_POLL,
  pollID,
  option
});

export const postVoteOnPoll = (pollID, option) => (
  (dispatch, getState) => {
    const {authedUser} = getState();
    // server access
      dispatch(voteOnPoll(pollID, option));
  }
);

export const changeSelectedOption = (pollID, option) => ({
  type: types.CHANGE_SELECTED_OPTION,
  pollID,
  option
})
