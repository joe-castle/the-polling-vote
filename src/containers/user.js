import React, {cloneElement} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {postVoteOnPoll} from '../actions/poll-actions';

import formatUrl from '../utils/format-url';

export const Polls = ({
  polls,
  children,
  postVoteOnPoll
}) => (
  <main>
    <div className='container'>

    </div>
  </main>
)
export default connect(
  state => ({
    polls: state.polls
  }),
  {postVoteOnPoll}
)(Polls);
