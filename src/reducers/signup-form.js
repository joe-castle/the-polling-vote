import * as types from '../actions/action-types';

const initialState = {
  username: '',
  name: '',
  password: ''
};

export default (state = initialState, {
  type, value
}) => {
	switch(type) {
    case types.CHANGE_SIGNUP_USERNAME:
      return {
        ...state,
        username: value
      };
    case types.CHANGE_SIGNUP_NAME:
      return {
        ...state,
        name: value
      };
    case types.CHANGE_SIGNUP_PASSWORD:
      return {
        ...state,
        password: value
      };
    case types.CLEAR_SIGNUP_FORM:
      return initialState;
		default:
			return state;
	}
};
