import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {postAddUser} from '../actions/user-actions';
import {
  changeLoginUsername,
  changeLoginPassword,
  loginUser} from '../actions/login-actions';

export const Login = ({
  baseColor,
  loginUser,
  loginForm,
  changeLoginPassword,
  changeLoginUsername
}, {history}) => (
  <main>
    <div className='container'>
      <div className='row'>
        <div className='col s12 m8 offset-m2'>
          <h1>Login</h1>
          <div className='divider'/>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginUser(loginForm, history);
            }}
            >
            <div className='input-field'>
              <input
                onChange={(e) => changeLoginUsername(e.target.value)}
                value={loginForm.username}
                id='username' type='text' className='validate' required/>
              <label htmlFor='username'>Username</label>
            </div>
            <div className='input-field'>
              <input
                onChange={(e) => changeLoginPassword(e.target.value)}
                value={loginForm.password}
                id='password' type='password' className='validate' required/>
              <label htmlFor='password'>Password</label>
            </div>
            <button type='submit' className={`btn ${baseColor}`}>Login</button>
          </form>
        </div>
      </div>
    </div>
  </main>
);
Login.contextTypes = {
  history: PropTypes.object
}

export default connect(
  state => ({
    authedUser: state.authedUser,
    loginForm: state.loginForm
  }),
  {loginUser, changeLoginPassword, changeLoginUsername}
)(Login);
