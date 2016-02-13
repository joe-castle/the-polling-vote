import * as types from '../actions/action-types';

export default (state = 1, {
  type,
  pageNumber
}) => {
	switch(type) {
    case types.CHANGE_USERS_PAGE:
      return pageNumber;
    case types.NEXT_USERS_PAGE:
      return state += 1;
    case types.PREVIOUS_USERS_PAGE:
     return state -= 1;
		default:
			return state;
	}
};
