import _ from 'lodash';

import * as types from '../actions/action-types';

export default (state = [], {
  type, payload, pollID, option
}) => {
	switch(type) {
    case types.ADD_POLL:
      return [
        ...state,
        payload
      ];
    case types.DELETE_POLL:
      return [
        ...state.slice(0, pollID),
        ...state.slice(pollID+1)
      ];
    case types.EDIT_POLL:
      return [
        ...state.slice(0, pollID),
        payload,
        ...state.slice(pollID+1)
      ];
    case types.VOTE_ON_POLL:
      let newCopy = _.cloneDeep(state[pollID]);
      newCopy.options[option] += 1;
      return [
        ...state.slice(0, pollID),
        newCopy,
        ...state.slice(0, pollID)
      ];
		default:
			return state;
	}
};
