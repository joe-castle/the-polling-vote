import React, {cloneElement} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import formatUrl from '../utils/format-url';

export const Polls = (props) => {
  if (props.children) {
    return cloneElement(props.children, {...props});
  } else {
    return props.polls.length > 0 ?
      <div className='container'>
        <div className='row'>
          <div className='col s12 m8 offset-m2 center'>
            <h1>Active Polls</h1>
            <div className='collection'>
              {props.polls.map((x, i) => (
                <Link
                  key={i}
                  to={`/polls/${formatUrl(x.name, true)}`}
                  className='collection-item'>{x.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      :
      <div className='container'>
        <div className='row'>
          <div className='col s12 m8 offset-m2 center'>
            <h1>No active polls found.</h1>
          </div>
        </div>
      </div>
  }
};
export default connect(
  state => ({polls: state.polls})
)(Polls);
