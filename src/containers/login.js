import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {
  changeLoginUsername,
  changeLoginPassword,
  loginUser} from '../actions/login-actions';

export const Login = ({
  history,
  dispatch,
  baseColor,
  loginForm
}) => (
  <main>
    <div className='container'>
      <div className='row'>
        <div className='col s12 m8 offset-m2'>
          <h1>Login</h1>
          <div className='divider'/>
          <form
            id='login'
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(loginUser(
                loginForm.username,
                loginForm.password,
                history
              ));
            }}
            >
            <div className='input-field'>
              <input
                value={loginForm.username}
                onChange={(e) => dispatch(changeLoginUsername(e.target.value))}
                name='username' type='text' className='validate' required/>
              <label htmlFor='username'>Username</label>
            </div>
            <div className='input-field'>
              <input
                value={loginForm.password}
                onChange={(e) => dispatch(changeLoginPassword(e.target.value))}
                name='password' type='password' className='validate' required/>
              <label htmlFor='password'>Password</label>
            </div>
            <button type='submit' className={`btn ${baseColor}`}>Login</button>
          </form>
        </div>
      </div>
    </div>
  </main>
);

export default connect(
  state => ({loginForm: state.loginForm})
)(Login);
