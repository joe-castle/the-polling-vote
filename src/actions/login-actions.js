import * as types from './action-types';

import {addAuthedUser} from './authed-user-actions';

export const changeLoginUsername = (value) => ({
  type: types.CHANGE_LOGIN_USERNAME,
  value
});

export const changeLoginPassword = (value) => ({
  type: types.CHANGE_LOGIN_PASSWORD,
  value
});

export const clearLoginForm = () => ({
  type: types.CLEAR_LOGIN_FORM
})

export const loginUser = (payload, history) => (
  dispatch => {
    // server access
      dispatch(addAuthedUser(payload.username))
      dispatch(clearLoginForm());
      history.push(`/users/${payload.username}`)
  }
)
