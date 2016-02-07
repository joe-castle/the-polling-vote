import * as types from './action-types';

import ajax from '../utils/ajax';

export const addAuthedUser = (username, name) => ({
  type: types.ADD_AUTHED_USER,
  username,
  name
});

export const removeAuthedUser = () => ({
  type: types.REMOVE_AUTHED_USER
});

export const logoutUser = () => (
  dispatch => {
    $.post('/logout')
      .done(res => {
        dispatch(removeAuthedUser());
      })
  }
)
