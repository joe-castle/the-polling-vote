import _ from 'lodash';

import * as types from '../actions/action-types';

export default (state = {}, {
  type, username, name, pollID
}) => {
  let newCopy = _.cloneDeep(state[username]);
	switch(type) {
    case types.ADD_USER:
      return {
        ...state,
        [username]: {
          name,
          ownPolls: []
        }
      };
    case types.ADD_OWN_POLL_ID:
      newCopy.ownPolls.push(pollID);
      return {
        ...state,
        [username]: newCopy
      }
    case types.DELETE_OWN_POLL_ID:
      let i = newCopy.ownPolls.findIndex(x => x === pollID);
      newCopy.ownPolls.splice(i, 1);
      return {
        ...state,
        [username]: newCopy
      }
		default:
			return state;
	}
};
