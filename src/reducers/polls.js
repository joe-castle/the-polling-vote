import _ from 'lodash';

import * as types from '../actions/action-types';

export default (state = [], {
  type, payload, pollID, option
}) => {
  let index;
  if (pollID) {
    index = state.findIndex(x=>x.id===pollID);
  } else if (payload && state.length > 0) {
    payload.id = state[state.length-1].id + 1;
  } else if (payload) {
    payload.id = 1;
  }
	switch(type) {
    case types.ADD_POLL:
      return [
        ...state,
        payload
      ];
    case types.DELETE_POLL:
      return [
        ...state.slice(0, index),
        ...state.slice(index+1)
      ];
    case types.EDIT_POLL:
      return [
        ...state.slice(0, index),
        payload,
        ...state.slice(index+1)
      ];
    case types.VOTE_ON_POLL:
      let newCopy = _.cloneDeep(state[index]);
      newCopy.options[option] += 1;
      return [
        ...state.slice(0, index),
        newCopy,
        ...state.slice(index+1)
      ];
		default:
			return state;
	}
};
