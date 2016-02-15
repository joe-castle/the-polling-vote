import React, {Component} from 'react';
import classNames from 'classNames';

import {nodesPerPage} from '../utils/page-filter';

export default class Pagination extends Component {
  pagination = () => {
    this.pages = Math.ceil(this.props.totalNodes / nodesPerPage)
    let nodes = [];
    for (let i = 1; i <= this.pages; i++) {
      nodes.push(
        <li
          key={i}
          className={classNames({
            active: i === this.props.pageNumber,
            [this.props.baseColor]: i === this.props.pageNumber
          })}>
          <a
            href='#'
            onClick={(e) => {
              e.preventDefault()
              this.props.change(i)
            }}>
            {i}
          </a>
        </li>
      );
    }
    return nodes;
  };
  render = () => (
    <ul className='pagination'>
      <li className={classNames({
          disabled: this.props.pageNumber === 1
        })}>
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault()
            if (this.props.pageNumber > 1) {
              this.props.previous()
            }
          }
        }>
          <i className='material-icons'>chevron_left</i></a></li>
      {this.pagination()}
      <li className={classNames({
          disabled: this.props.pageNumber === this.pages
        })}>
        <a
          href='#'
          onClick={(e) => {
            e.preventDefault()
            if (this.props.pageNumber < this.pages) {
              this.props.next()
            }
          }
        }>
          <i className='material-icons'>chevron_right</i></a></li>
    </ul>
  );
}
