import * as types from '../actions/action-types';

export default (state = 1, {
  type,
  pageNumber
}) => {
	switch(type) {
    case types.CHANGE_POLLS_PAGE:
      return pageNumber;
    case types.NEXT_POLLS_PAGE:
      return state += 1;
    case types.PREVIOUS_POLLS_PAGE:
     return state -= 1;
		default:
			return state;
	}
};
