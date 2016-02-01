import React, {Component} from 'react';
import {Link} from 'react-router';
import classNames from 'classNames';

import formatUrl from '../utils/format-url';

export default ({
  users,
  polls,
  baseColor,
  postDeletePoll,
  params
}) => (
  <div className='container'>
    <div className='row'>
      <div className='col s12 m8 offset-m2'>
        <div className='center'>
          <h1 className='center'>{params.user}</h1>
        </div>
        {true && <form>
          <h4>New Poll</h4>
          <div className='input-field'>
            <input
              type='text'
              placeholder='Poll Name'
              className='validate'
            />
          </div>
          <div className='input-field'>
            <input
              type='text'
              placeholder='Option #1'
              className='validate'
            />
            <input
              type='text'
              placeholder='Option #2'
              className='validate'
            />
          <button
            style={{marginBottom: '15px'}}
            className={classNames('btn', baseColor)}
            type='submit'
            >Submit</button>
          </div>
        </form>}
        <div className='divider'/>
        <ul className='collection with-header center'>
          <li className='collection-header'><h4>Active Polls</h4></li>
          {users[params.user].ownPolls.map(x => {
            let poll = polls.find(y => y.id === x);
            return (
              <li key={x} className='collection-item'>
                <div>
                  <Link
                    to={`/polls/${formatUrl(poll.name, true)}`}
                  >{poll.name}</Link>
                  <a
                    href=''
                    onClick={(e) => {
                      e.preventDefault();
                      postDeletePoll(params.user, x);
                    }}
                    className='secondary-content'
                  >
                    <i style={{color: baseColor}} className='material-icons'>delete</i>
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  </div>
);
