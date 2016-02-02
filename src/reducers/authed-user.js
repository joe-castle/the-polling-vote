import * as types from '../actions/action-types';

const initialState = {
  username: '',
  name: ''
};

export default (state = initialState, {
  type,
  username,
  name
}) => {
	switch(type) {
    case types.ADD_AUTHED_USER:
      return {
        username,
        name
      };
    case types.REMOVE_AUTHED_USER:
      return initialState;
		default:
			return state;
	}
};
