import React, {cloneElement} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import formatUrl from '../utils/format-url';

export const Polls = (props) => {
  let child, {polls} = props;
  if (props.children) {child = cloneElement(props.children, {...props});}
  return (
    <main>
      {child ||
        <div className='container'>
          <div className='row'>
            <div className='col s12 m8 offset-m2 center'>
              <h1>Active Polls</h1>
              <div className='divider'/>
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
  state => ({polls: state.polls})
)(Polls);
