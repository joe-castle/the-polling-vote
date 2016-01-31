import React, {cloneElement} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import ContentWrapper from '../components/content-wrapper';

export const Polls = ({
  polls,
  children
}) => {
  let child;
  if (children) {child = cloneElement(children, {polls})}
  return (
    <ContentWrapper>
        {child ||
          <div className='col s12 m8 offset-m2 center'>
            <h1>Active Polls</h1>
            <div className='divider'></div>
            <div className='collection'>
              {polls.map((x, i) => (
                <Link
                  key={i}
                  to={`/polls/${x.name}`}
                  className='collection-item'>{x.name}</Link>
              ))}
            </div>
          </div>
        }
    </ContentWrapper>
  )
};
export default connect(state => ({
    polls: state.polls
  })
)(Polls);
