import React, {cloneElement, Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import formatUrl from '../utils/format-url';
import pageFilter from '../utils/page-filter';

import {
  changePollsPage,
  nextPollsPage,
  previousPollsPage} from '../actions/polls-page-actions';

import Pagination from '../components/pagination';

export const Polls = (props) => {
  if (props.children) {
    return cloneElement(props.children, props);
  } else {
    return props.polls.length > 0 ?
      <div className='container'>
        <div className='row'>
          <div className='col s12 m8 offset-m2 center'>
            <h1>Active Polls</h1>
            <Pagination
              baseColor={props.baseColor}
              pageNumber={props.pollsPage}
              totalNodes={props.polls.length}
              next={() => props.dispatch(nextPollsPage())}
              previous={() => props.dispatch(previousPollsPage())}
              change={(pageNumber) => props.dispatch(changePollsPage(pageNumber))}
            />
            <div className='divider'/>
            <div className='collection'>
              {props.pagedPolls.map((x, i) => (
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
}

export default connect(
  state => ({
    polls: state.polls,
    pollsPage: state.pollsPage,
    pagedPolls: pageFilter(state.polls, state.pollsPage)
  })
)(Polls);
