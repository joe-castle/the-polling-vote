import * as types from '../actions/action-types';

const initialState = {
  username: '',
  password: ''
};

export default (state = initialState, {
  type, value
}) => {
	switch(type) {
    case types.CHANGE_LOGIN_USERNAME:
      return {
        ...state,
        username: value
      };
    case types.CHANGE_LOGIN_PASSWORD:
      return {
        ...state,
        password: value
      };
    case types.CLEAR_LOGIN_FORM:
      return initialState;
		default:
			return state;
	}
};
