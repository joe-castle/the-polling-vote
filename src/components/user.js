import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import formatUrl from '../utils/format-url';

export default ({
  users,
  polls,
  params,
  history,
  pollForm,
  baseColor,
  authedUser,
  postAddPoll,
  postEditPoll,
  postDeletePoll,
  insertPollForm,
  changePollFormName,
  changePollFormOptions
}) => (
  <div className='container'>
    <div className='row'>
      <div className='col s12 m8 offset-m2'>
        <div className='center'>
          <h1 className='center'>{params.user}</h1>
        </div>
        {authedUser === params.user &&
        <form onSubmit={(e) => {
            e.preventDefault();
            if (pollForm.formType === 'Add') {
              postAddPoll(history);
            } else {
              postEditPoll(history);
            }
          }}>
          <h4>{pollForm.formType} Poll</h4>
          <div className='input-field'>
            <input
              onChange={(e) => changePollFormName(e.target.value)}
              value={pollForm.name}
              type='text'
              placeholder='Poll Name'
              className='validate'
              disabled={pollForm.formType === 'Edit'}
              required
            />
          </div>
          <div className='input-field'>
            {pollForm.options.map((x, i) => (
              <input
                key={i}
                onChange={(e) => changePollFormOptions(e.target.value, i)}
                value={x}
                type='text'
                placeholder={`Option #${i+1}`}
                className='validate'
                required={i===0 || i===1}
              />
            ))}
          <button
            style={{marginBottom: '15px'}}
            className={`btn ${baseColor}`}
            type='submit'
            >Submit</button>
          </div>
        </form>}
        <div className='divider'/>
        <ul className='collection with-header'>
          <li className='collection-header'><h4>Active Polls</h4></li>
          {users[params.user].ownPolls.map(x => {
            let poll = polls.find(y => y.id === x);
            return (
              <li key={x} className='collection-item'>
                <div>
                  <Link
                    to={`/polls/${formatUrl(poll.name, true)}`}
                  >{poll.name}</Link>
                  {authedUser === params.user && <span><a
                    onClick={(e) => {
                      e.preventDefault();
                      postDeletePoll(poll.id);
                    }}
                    className='secondary-content'
                  >
                    <i className='delete material-icons'>delete</i>
                  </a>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      insertPollForm(poll.id, 'Edit');
                    }}
                    className='secondary-content'
                  >
                    <i className='mode-edit material-icons'>mode_edit</i>
                  </a></span>}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  </div>
);
