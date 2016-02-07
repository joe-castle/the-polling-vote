import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {postAddUser} from '../actions/user-actions';
import {
  changeSignupName,
  changeSignupUsername,
  changeSignupPassword} from '../actions/signup-actions';

export const Signup = ({
  dispatch,
  baseColor,
  signupForm
}) => (
  <main>
    <div className='container'>
      <div className='row'>
        <div className='col s12 m8 offset-m2'>
          <h1>Signup</h1>
          <div className='divider'/>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(postAddUser(
                signupForm.username,
                signupForm.name,
                signupForm.password,
              ));
            }}
            >
            <div className='input-field'>
              <input
                value={signupForm.username}
                onChange={(e) => dispatch(changeSignupUsername(e.target.value))}
                id='username' type='text' className='validate' required/>
              <label htmlFor='username'>Username</label>
            </div>
            <div className='input-field'>
              <input
                value={signupForm.name}
                onChange={(e) => dispatch(changeSignupName(e.target.value))}
                id='first-name' type='text' className='validate' required/>
              <label htmlFor='first-name'>First Name</label>
            </div>
            <div className='input-field'>
              <input
                value={signupForm.password}
                onChange={(e) => dispatch(changeSignupPassword(e.target.value))}
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

export default connect(
  state => ({signupForm: state.signupForm})
)(Signup);
