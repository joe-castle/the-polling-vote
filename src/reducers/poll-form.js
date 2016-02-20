import * as types from '../actions/action-types';

const initialState = {
  formType: 'Add',
  name: '',
  options: ['', '']
};

export default (state = initialState, {
  type,
  name,
  value,
  index,
  options,
  formType
}) => {
	switch(type) {
    case types.CHANGE_POLL_FORM_TYPE:
      return {
        ...state,
        formType
      }
    case types.CHANGE_POLL_FORM_NAME:
      return {
        ...state,
        name
      };
    case types.CHANGE_POLL_FORM_OPTION:
      return {
        ...state,
        options: [
          ...state.options.slice(0, index),
          value,
          ...state.options.slice(index+1)
        ]
      };
    case types.ADD_POLL_FORM_OPTIONS_INPUT:
      return {
        ...state,
        options: [
          ...state.options,
          ''
        ]
      };
    case types.REMOVE_POLL_FORM_OPTIONS_INPUT:
      return {
        ...state,
        options: [
          ...state.options.slice(0, index),
          ...state.options.slice(index+1)
        ]
      };
    case types.INSERT_POLL_FORM_OPTIONS:
      return {
        ...state,
        options
      };
    case types.CLEAR_POLL_FORM:
      return initialState;
		default:
			return state;
	}
};
