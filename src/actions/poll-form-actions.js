import * as types from './action-types';

export const changePollFormType = (formType) => ({
  type: types.CHANGE_POLL_FORM_TYPE,
  formType
});

export const changePollFormName = (name) => ({
  type: types.CHANGE_POLL_FORM_NAME,
  name
});

export const insertPollFormOptions = (options) => ({
  type: types.INSERT_POLL_FORM_OPTIONS,
  options
});

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

export const insertPollForm = (pollName, formType) => (
  (dispatch, getState) => {
    let poll = getState().polls.find(x => x.name === pollName)
      , options = Object.keys(poll.options);
    options.push('');

    dispatch(changePollFormType(formType));
    dispatch(changePollFormName(poll.name));
    dispatch(insertPollFormOptions(options));
  }
);

export const changePollFormOptions = (options, value, index) => (
  dispatch => {
    if (options.length >= 2 && value && index === options.length - 1) {
      dispatch(addPollFormOptionsInput());
      dispatch(changePollFormOption(value, index));
    } else if (options.length > 2 && !value) {
      dispatch(removePollFormOptionsInput(index));
    } else {
      dispatch(changePollFormOption(value, index));
    }

  }
);
