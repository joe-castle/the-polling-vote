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

export const editPoll = (pollID, payload) => ({
  type: types.EDIT_POLL,
  pollID,
  payload
});

export const deletePoll = (pollID) => ({
  type: types.DELETE_POLL,
  pollID
});

export const voteOnPoll = (pollID, option) => ({
  type: types.VOTE_ON_POLL,
  pollID,
  option
});

export const changeSelectedOption = (pollID, option) => ({
  type: types.CHANGE_SELECTED_OPTION,
  pollID,
  option
});

export const postAddPoll = (history) => (
  (dispatch, getState) => {
    let {polls, authedUser, pollForm} = getState()

    let payload = createPayload(
      authedUser.username, pollForm.name, pollForm.options, {}
    );
    ajax('POST', payload)
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

export const postEditPoll = (history) => (
  (dispatch, getState) => {
    let {authedUser, pollForm, polls} = getState()
      , {id, options} = polls.find(x => x.name === pollForm.name)
      , payload = {
          id,
          ...createPayload(
            authedUser.username, pollForm.name, pollForm.options, options
          )
        }
    ajax('PUT', {payload, type:'edit'})
      .done(res => {
        dispatch(editPoll(payload.id, payload));
        dispatch(clearPollForm());
        Materialize.toast(
          'Poll succesfully edited! Redirecting...',
          1000, '',
          () => history.push(`/polls/${formatUrl(payload.name, true)}`)
        );
      });
  }
);

export const postDeletePoll = (pollID) => (
  (dispatch, getState) => {
    const {authedUser} = getState();
    ajax('DELETE', {pollID, user:authedUser.username})
      .done(res => {
        dispatch(deleteOwnPollID(authedUser.username, pollID));
        dispatch(deletePoll(pollID));
        Materialize.toast('Poll succesfully deleted!', 4000);
      });
  }
);

export const postVoteOnPoll = (pollID, option) => (
  (dispatch, getState) => {
    const {authedUser} = getState();
    ajax('PUT', {pollID, option, type: 'vote'})
      .done(res => {
        dispatch(voteOnPoll(pollID, option));
        Materialize.toast(`Thanks for voting for '${option}'!`, 4000);
      });
  }
);
