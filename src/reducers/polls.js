import * as types from '../actions/action-types';

export default (state = [], {
  type,
  option,
  payload,
  pollName
}) => {
  const index = pollName && state.findIndex(x => x.name === pollName);
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
    case types.CHANGE_SELECTED_OPTION:
      return [
        ...state.slice(0, index),
        {
          ...state[index],
          selectedOption: option
        },
        ...state.slice(index+1)
      ]
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
