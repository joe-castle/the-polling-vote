import React, {cloneElement} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {postDeletePoll, postAddPoll} from '../actions/poll-actions';

import formatUrl from '../utils/format-url';

export const Users = (props) => {
  let child, {users} = props;
  if (props.children) {child = cloneElement(props.children, {...props});}
  return (
    <main>
      {child ||
        <div className='container'>
          <div className='row'>
            <div className='col s12 m8 offset-m2 center'>
              <h1>Active Users</h1>
              <div className='divider'/>
              <div className='collection'>
                {Object.keys(users).map((x, i) => (
                  <Link
                    key={i}
                    to={`/users/${x}`}
                    className='collection-item'>{x}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </main>
  )
}
export default connect(
  state => ({
    users: state.users,
    polls: state.polls,
    authedUser: state.authedUser
  }),
  {postDeletePoll, postAddPoll}
)(Users);
