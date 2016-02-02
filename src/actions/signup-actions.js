import * as types from './action-types';

export const changeSignupUsername = (value) => ({
  type: types.CHANGE_SIGNUP_USERNAME,
  value
});

export const changeSignupName = (value) => ({
  type: types.CHANGE_SIGNUP_NAME,
  value
});

export const changeSignupPassword = (value) => ({
  type: types.CHANGE_SIGNUP_PASSWORD,
  value
});

export const clearSignupForm = () => ({
  type: types.CLEAR_SIGNUP_FORM
})
