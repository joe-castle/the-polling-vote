import React, {cloneElement} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import formatUrl from '../utils/format-url';

export const Polls = (props) => {
  if (props.children) {
    return cloneElement(props.children, props);
  } else {
    return props.polls.length > 0 ?
      <div className='container'>
        <div className='row'>
          <div className='col s12 m8 offset-m2 center'>
            <h1>Active Polls</h1>
            <ul className='pagination'>
              <li className='disabled'><a><i className='material-icons'>chevron_left</i></a></li>
              {props.polls.map((x, i) => (
                <li
                  key={i}
                  className=''><a href='#'>{i+1}</a></li>
              ))}
              <li className='disabled'><a><i className='material-icons'>chevron_right</i></a></li>
            </ul>
            <div className='divider'/>
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
