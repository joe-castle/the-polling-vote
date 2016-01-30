import * as types from '../actions/action-types';

export default (state = {}, {
  type, username, payload
}) => {
	switch(type) {
    case types.ADD_USER:
      return {
        ...state,
        [username]: payload
      };
		default:
			return state;
	}
};
