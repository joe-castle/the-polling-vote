import * as types from '../actions/action-types';

export default (state = '', {
  type,
  username
}) => {
	switch(type) {
    case types.ADD_AUTHED_USER:
      return username;
    case types.REMOVE_AUTHED_USER:
      return '';
		default:
			return state;
	}
};
