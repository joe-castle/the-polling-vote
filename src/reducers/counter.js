import * as types from '../actions/action-types';

export default (state = 0, action) => {
	switch(action.type) {
		case types.INCREMENT_VALUE:
			return state + 1;
    case types.DECREMENT_VALUE:
      return state - 1;
		default:
			return state;
	}
};
