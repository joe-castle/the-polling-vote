import * as types from './action-types';
import {addOwnPollID, deleteOwnPoll} from './user-actions';
import {clearPollForm} from './poll-form-actions';

import formatUrl from '../utils/format-url';
import createPayload from '../utils/create-payload';
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

export const postAddPoll = (pollName, options, history) => (
  dispatch => {
    let payload = createPayload(
      pollName, options, {}
    );

    ajax('POST', payload)
      .done(res => {
        dispatch(addPoll(res));
        dispatch(addOwnPollID(res.submitter, res.name));
        dispatch(clearPollForm());
        Materialize.toast(
          'Poll succesfully created! Redirecting...',
          1000, '',
          () => history.push(`/polls/${formatUrl(res.name, true)}`)
        );
      })
      .fail(err => {
        Materialize.toast(err.responseText, 4000);
      });
  }
);

export const postEditPoll = (pollName, newOptions, history) => (
  (dispatch, getState) => {
    let {options} = getState().polls.find(x => x.name === pollName)
      , payload = createPayload(
          pollName, newOptions, options
      );

    ajax('PUT', {payload, type:'edit'})
      .done(res => {
        dispatch(editPoll(payload.name, payload));
        dispatch(clearPollForm());
        Materialize.toast(
          'Poll succesfully edited! Redirecting...',
          1000, '',
          () => history.push(`/polls/${formatUrl(payload.name, true)}`)
        );
      });
  }
);

export const postDeletePoll = (pollName) => (
  dispatch => {
    ajax('DELETE', {pollName})
      .done(res => {
        dispatch(deleteOwnPoll(res.user, pollName));
        dispatch(deletePoll(pollName));
        Materialize.toast('Poll succesfully deleted!', 4000);
      });
  }
);

export const postVoteOnPoll = (pollName, option) => (
  dispatch => {
    ajax('PUT', {pollName, option, type: 'vote'})
      .done(res => {
        dispatch(voteOnPoll(pollName, option));
        Materialize.toast(`Thanks for voting for '${option}'!`, 4000);
      });
  }
);
