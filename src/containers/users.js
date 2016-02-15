import React, {cloneElement} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import formatUrl from '../utils/format-url';
import pageFilter from '../utils/page-filter';

import {
  changeUsersPage,
  nextUsersPage,
  previousUsersPage} from '../actions/users-page-actions';

import Pagination from '../components/pagination';

export const Users = (props) => {
  if (props.children) {
    return cloneElement(props.children, props);
  } else {
    return props.users.length > 0 ?
      <div className='container'>
        <div className='row'>
          <div className='col s12 m8 offset-m2 center'>
            <h1>Active Users</h1>
              <Pagination
                baseColor={props.baseColor}
                pageNumber={props.usersPage}
                totalNodes={props.users.length}
                next={() => props.dispatch(nextUsersPage())}
                previous={() => props.dispatch(previousUsersPage())}
                change={(pageNumber) => props.dispatch(changeUsersPage(pageNumber))}
              />
            <div className='divider'/>
            <div className='collection'>
              {props.pagedUsers.map((x, i) => (
                <Link
                  key={i}
                  to={`/users/${x.username}`}
                  className='collection-item'>{x.username}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      :
      <div className='container'>
        <div className='row'>
          <div className='col s12 m8 offset-m2 center'>
            <h1>No active users found.</h1>
          </div>
        </div>
      </div>
  }
}
export default connect(
  state => ({
    users: state.users,
    polls: state.polls,
    pollForm: state.pollForm,
    usersPage: state.usersPage,
    pagedUsers: pageFilter(state.users, state.usersPage),
    authedUser: state.authedUser.username
  })
)(Users);
