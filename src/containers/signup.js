import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {postAddUser} from '../actions/user-actions';
import {
  changeSignupName,
  changeSignupUsername,
  changeSignupPassword} from '../actions/signup-actions';

export const Signup = ({
  baseColor,
  postAddUser,
  changeSignupName,
  changeSignupPassword,
  changeSignupUsername
}, {history}) => (
  <main>
    <div className='container'>
      <div className='row'>
        <div className='col s12 m8 offset-m2'>
          <h1>Signup</h1>
          <div className='divider'/>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              postAddUser(history);
            }}
            >
            <div className='input-field'>
              <input
                onChange={(e) => changeSignupUsername(e.target.value)}
                id='username' type='text' className='validate' required/>
              <label htmlFor='username'>Username</label>
            </div>
            <div className='input-field'>
              <input
                onChange={(e) => changeSignupName(e.target.value)}
                id='first-name' type='text' className='validate' required/>
              <label htmlFor='first-name'>First Name</label>
            </div>
            <div className='input-field'>
              <input
                onChange={(e) => changeSignupPassword(e.target.value)}
                id='password' type='password' className='validate' required/>
              <label htmlFor='password'>Password</label>
            </div>
            <button type='submit' className={`btn ${baseColor}`}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  </main>
);
Signup.contextTypes = {
  history: PropTypes.object
}

export default connect(
  state => ({
    authedUser: state.authedUser,
  }),
  {postAddUser, changeSignupName, changeSignupPassword, changeSignupUsername}
)(Signup);
