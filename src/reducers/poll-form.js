import * as types from '../actions/action-types';

const initialState = {
  name: '',
  options: ['', '']
};

export default (state = initialState, {
  type,
  name,
  value,
  index,
  options
}) => {
	switch(type) {
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
    case types.CLEAR_POLL_FORM:
      return initialState;
		default:
			return state;
	}
};
