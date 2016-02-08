import * as types from './action-types';

export const isFetching = (fetching) => ({
  type: types.SET_IS_FETCHING,
  fetching
})
