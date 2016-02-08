import * as types from './action-types';

import {isFetching} from '../actions/is-fetching-actions';
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
    dispatch(isFetching(true));
    $.post('/logout')
      .done(res => {
        dispatch(isFetching(false));
        dispatch(removeAuthedUser());
        Materialize.toast('Logout succesfull!', 4000);
      })
  }
)
