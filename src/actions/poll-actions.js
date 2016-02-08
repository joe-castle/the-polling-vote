import * as types from './action-types';
import {addOwnPoll, deleteOwnPoll} from './user-actions';
import {clearPollForm, changePollFormType} from './poll-form-actions';
import {removeAuthedUser} from './authed-user-actions';

import {history} from '../routes/react';
import formatUrl from '../utils/format-url';
import ajax from '../utils/ajax';

export const addPoll = (payload) => ({
  type: types.ADD_POLL,
  payload
});

export const editPoll = (pollName, payload) => ({
  type: types.EDIT_POLL,
  pollName,
  payload
});

export const deletePoll = (pollName) => ({
  type: types.DELETE_POLL,
  pollName
});

export const voteOnPoll = (pollName, option) => ({
  type: types.VOTE_ON_POLL,
  pollName,
  option
});

export const changeSelectedOption = (pollName, option) => ({
  type: types.CHANGE_SELECTED_OPTION,
  pollName,
  option
});

export const postAddPoll = (pollName, options) => (
  dispatch => {
    ajax('POST', {pollName, options})
      .done(poll => {
        poll.selectedOption = 'select';
        dispatch(addPoll(poll));
        dispatch(addOwnPoll(poll.submitter, poll.name));
        dispatch(clearPollForm());
        Materialize.toast(
          'Poll succesfully created! Redirecting...',
          1000, '',
          () => history.push(`/polls/${formatUrl(poll.name, true)}`)
        );
      });
  }
);

export const postEditPoll = (pollName, newOptions) => (
  dispatch => {
    ajax('PUT', {pollName, newOptions})
      .done(poll => {
        dispatch(editPoll(poll.name, poll));
        dispatch(clearPollForm());
        Materialize.toast(
          'Poll succesfully edited! Redirecting...',
          1000, '',
          () => history.push(`/polls/${formatUrl(poll.name, true)}`)
        );
      })
  }
);

export const postDeletePoll = (pollName) => (
  dispatch => {
    ajax('DELETE', {pollName})
      .done(username => {
        // Need to get authed user to delete
        dispatch(deleteOwnPoll(username, pollName));
        dispatch(deletePoll(pollName));
        dispatch(changePollFormType('Add'));
        dispatch(clearPollForm());
        Materialize.toast('Poll succesfully deleted!', 4000);
      })
  }
);

export const postVoteOnPoll = (pollName, option) => (
  dispatch => {
    ajax('PUT', {pollName, option}, '/api/polls/vote')
      .done(() => {
        dispatch(voteOnPoll(pollName, option));
        Materialize.toast(`Thanks for voting for '${option}'!`, 4000);
      })
  }
);
