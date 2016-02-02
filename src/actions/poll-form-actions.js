import * as types from './action-types';

import {addAuthedUser} from './authed-user-actions';

export const changePollFormName = (name) => ({
  type: types.CHANGE_POLL_FORM_NAME,
  name
});

export const changePollFormOptions = (value, index) => (
  (dispatch, getState) => {
    const {pollForm} = getState();

    if (pollForm.options.length >= 2 && value && index === pollForm.options.length - 1) {
      dispatch(addPollFormOptionsInput());
    }
    if (pollForm.options.length > 2 && !value) {
      dispatch(removePollFormOptionsInput(index));
    }

    dispatch(changePollFormOption(value, index));
  }
);

export const changePollFormOption = (value, index) => ({
  type: types.CHANGE_POLL_FORM_OPTION,
  value,
  index
});

export const addPollFormOptionsInput = () => ({
  type: types.ADD_POLL_FORM_OPTIONS_INPUT,
});

export const removePollFormOptionsInput = (index) => ({
  type: types.REMOVE_POLL_FORM_OPTIONS_INPUT,
  index
});

export const clearPollForm = () => ({
  type: types.CLEAR_POLL_FORM
});
