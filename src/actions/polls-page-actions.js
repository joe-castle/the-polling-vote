import * as types from './action-types';

export const changePollsPage = (pageNumber) => ({
  type: types.CHANGE_POLLS_PAGE,
  pageNumber
});

export const nextPollsPage = () => ({
  type: types.NEXT_POLLS_PAGE
});

export const previousPollsPage = () => ({
  type: types.PREVIOUS_POLLS_PAGE
});
