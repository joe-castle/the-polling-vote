import * as types from '../actions/action-types';

export default (state = [], {
  type, payload, pollID, option
}) => {
  let index = pollID ? state.findIndex(x=>x.id===pollID) : null;
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
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          options: {
            ...state[index].options,
            [option]: state[index].options[option] + 1
          }
        },
        ...state.slice(index+1)
      ];
		default:
			return state;
	}
};
