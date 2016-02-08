import * as types from '../actions/action-types';

export default (state = false, {
  type,
  fetching
}) => {
	switch(type) {
    case types.SET_IS_FETCHING:
      return fetching;
		default:
			return state;
	}
};
