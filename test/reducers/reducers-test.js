'use strict';

import {expect} from 'chai';

import * as types from '../../src/actions/action-types';

import authedUser from '../../src/reducers/authed-user';
import isFetching from '../../src/reducers/is-fetching';
import loginForm from '../../src/reducers/login-form';
import pollForm from '../../src/reducers/poll-form';
import pollsPage from '../../src/reducers/polls-page';
import polls from '../../src/reducers/polls';
import signupForm from '../../src/reducers/signup-form';
import usersPage from '../../src/reducers/users-page';
import users from '../../src/reducers/users';

describe('Redux Reducers', () => {
  describe('Authed User', () => {
    it('Returns the initial state', () => {
      const expectedResponse = {
        username: '',
        name: ''
      };
      expect(authedUser(undefined, {})).to.deep.equal(expectedResponse);
    });
    it('Adds the authed user', () => {
      const payload = {
        type: types.ADD_AUTHED_USER,
        username: 'unchained',
        name: 'django'
      }
      const expectedResponse = {
        username: 'unchained',
        name: 'django'
      };
      expect(authedUser(undefined, payload)).to.deep.equal(expectedResponse);
    })
    it('Removes authed user', () => {
      const payload = {
        type: types.REMOVE_AUTHED_USER
      }
      const startingState = {
        username: 'unchained',
        name: 'django'
      };
      const expectedResponse = {
        username: '',
        name: ''
      };
      expect(authedUser(startingState, payload)).to.deep.equal(expectedResponse)
    });
  });
  describe('Is Fetching', () => {
    it('Returns the initial state', () => {
      expect(isFetching(undefined, {})).to.equal(false);
    });
    it('Sets is fetching', () => {
      const payload = {
        type: types.SET_IS_FETCHING,
        fetching: true
      }
      expect(isFetching(undefined, payload)).to.equal(true);
    });
  });
  describe('Login Form', () => {
    it('Returns the initial state', () => {
      const expectedResponse = {
        username: '',
        password: ''
      };
      expect(loginForm(undefined, {})).to.deep.equal(expectedResponse);
    });
    it('Changes the username', () => {
      const payload = {
        type: types.CHANGE_LOGIN_USERNAME,
        value: 'unchained'
      }
      const expectedResponse = {
        username: 'unchained',
        password: ''
      };
      expect(loginForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Changes the password', () => {
      const payload = {
        type: types.CHANGE_LOGIN_PASSWORD,
        value: 'password'
      }
      const expectedResponse = {
        username: '',
        password: 'password'
      };
      expect(loginForm(undefined, payload)).to.deep.equal(expectedResponse);
    })
    it('Clears the login form', () => {
      const payload = {
        type: types.CLEAR_LOGIN_FORM
      }
      const startingState = {
        username: 'unchained',
        password: 'password'
      };
      const expectedResponse = {
        username: '',
        password: ''
      };
      expect(loginForm(startingState, payload)).to.deep.equal(expectedResponse);
    })
  });
});
