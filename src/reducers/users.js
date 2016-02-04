import * as types from '../actions/action-types';

export default (state = [], {
  type,
  username,
  pollName
}) => {
  let index = state.findIndex(x => x.username === username)
  let pollIndex;
  if (index > -1) {pollIndex = state[index].ownPolls.findIndex(x => x === pollName)}
	switch(type) {
    case types.ADD_USER:
     return [
       ...state,
       {
         username,
         ownPolls: []
       }
     ];
    case types.ADD_OWN_POLL:
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          ownPolls: [
            ...state[index].ownPolls,
            pollName
          ]
        },
        ...state.slice(index + 1)
      ];
    case types.DELETE_OWN_POLL:
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          ownPolls: [
            ...state[index].ownPolls.slice(0, pollIndex),
            ...state[index].ownPolls.slice(pollIndex + 1)
          ]
        },
        ...state.slice(index + 1)
      ];
		default:
			return state;
	}
};
