let initialState = window.__INITIAL_STATE__;
if (initialState.polls) {initialState.polls = initialState.polls.map(x => ({
  ...x,
  selectedOption: 'select'
}))}

export default configureStore(initialState);
