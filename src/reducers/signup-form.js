import * as types from '../actions/action-types';

export default (state = {
  username: '',
  name: '',
  password: ''
}, {
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
		default:
			return state;
	}
};
