import {combineReducers} from 'redux';

import polls from './polls';
import users from './users';
import authedUser from './authed-user';

export default combineReducers({
  polls,
  users,
  authedUser
});
