import React, {cloneElement, Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classNames from 'classNames';

import formatUrl from '../utils/format-url';
import pageFilter, {nodesPerPage} from '../utils/page-filter';

import {
  changePollsPage,
  nextPollsPage,
  previousPollsPage} from '../actions/polls-page-actions';

export class Polls extends Component {
  pagination = () => {
    this.pages = Math.ceil(this.props.polls.length / nodesPerPage)
    let nodes = [];
    for (let i = 1; i <= this.pages; i++) {
      nodes.push(
        <li
          key={i}
          className={classNames({
            active: i === this.props.pollsPage,
            [this.props.baseColor]: i === this.props.pollsPage
          })}>
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault()
              this.props.dispatch(changePollsPage(i))
            }}>
            {i}
          </a>
        </li>
      );
    }
    return nodes;
  };
  render() {
    if (this.props.children) {
      return cloneElement(this.props.children, this.props);
    } else {
      return this.props.polls.length > 0 ?
        <div className='container'>
          <div className='row'>
            <div className='col s12 m8 offset-m2 center'>
              <h1>Active Polls</h1>
              <ul className='pagination'>
                <li className={classNames({
                    disabled: this.props.pollsPage === 1
                  })}>
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      if (this.props.pollsPage > 1) {
                        this.props.dispatch(previousPollsPage())
                      }
                    }
                  }>
                    <i className='material-icons'>chevron_left</i></a></li>
                {this.pagination()}
                <li className={classNames({
                    disabled: this.props.pollsPage === this.pages
                  })}>
                  <a
                    href='#'
                    onClick={(e) => {
                      e.preventDefault()
                      if (this.props.pollsPage < this.pages) {
                        this.props.dispatch(nextPollsPage())
                      }
                    }
                  }>
                    <i className='material-icons'>chevron_right</i></a></li>
              </ul>
              <div className='divider'/>
              <div className='collection'>
                {this.props.pagedPolls.map((x, i) => (
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
}

export default connect(
  state => ({
    polls: state.polls,
    pagedPolls: pageFilter(state.polls, state.pollsPage),
    pollsPage: state.pollsPage
  })
)(Polls);
