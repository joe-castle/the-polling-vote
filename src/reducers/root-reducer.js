import {combineReducers} from 'redux';

import polls from './polls';
import users from './users';
import signupForm from './signup-form';
import loginForm from './login-form';
import pollForm from './poll-form';
import authedUser from './authed-user';

export default combineReducers({
  polls,
  users,
  signupForm,
  loginForm,
  pollForm,
  authedUser
});
