import _ from 'lodash';

import * as types from '../actions/action-types';

export default (state = {}, {
  type,
  name,
  username,
  pollName
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
    case types.ADD_OWN_POLL:
      newCopy.ownPolls.push(pollName);
      return {
        ...state,
        [username]: newCopy
      }
    case types.DELETE_OWN_POLL:
      let i = newCopy.ownPolls.findIndex(x => x === pollName);
      newCopy.ownPolls.splice(i, 1);
      return {
        ...state,
        [username]: newCopy
      }
		default:
			return state;
	}
};
