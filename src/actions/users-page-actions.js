import * as types from './action-types';

export const changeUsersPage = (pageNumber) => ({
  type: types.CHANGE_USERS_PAGE,
  pageNumber
});

export const nextUsersPage = () => ({
  type: types.NEXT_USERS_PAGE
});

export const previousUsersPage = () => ({
  type: types.PREVIOUS_USERS_PAGE
});
