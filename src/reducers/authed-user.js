import * as types from '../actions/action-types';

export default (state = '', {
  type, user
}) => {
	switch(type) {
    case types.ADD_AUTHED_USER:
      return user;
    case types.REMOVE_AUTHED_USER:
      return '';
		default:
			return state;
	}
};
