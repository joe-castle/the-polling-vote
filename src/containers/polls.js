import React, {cloneElement} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {postVoteOnPoll} from '../actions/poll-actions';

import formatUrl from '../utils/format-url';

export const Polls = ({
  polls,
  children,
  postVoteOnPoll
}) => {
  let child;
  if (children) {child = cloneElement(children, {polls, postVoteOnPoll})}
  return (
    <main>
      {child ||
        <div className='container'>
          <div className='row'>
            <div className='col s12 m8 offset-m2 center'>
              <h1>Active Polls</h1>
              <div className='divider'></div>
              <div className='collection'>
                {polls.map((x, i) => (
                  <Link
                    key={i}
                    to={`/polls/${formatUrl(x.name, true)}`}
                    className='collection-item'>{x.name}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </main>
  )
};
export default connect(
  state => ({
    polls: state.polls
  }),
  {postVoteOnPoll}
)(Polls);
