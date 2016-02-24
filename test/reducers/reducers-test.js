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
      const initialState = {
        username: 'unchained',
        name: 'django'
      };
      const expectedResponse = {
        username: '',
        name: ''
      };
      expect(authedUser(initialState, payload)).to.deep.equal(expectedResponse)
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
      const initialState = {
        username: 'unchained',
        password: 'password'
      };
      const expectedResponse = {
        username: '',
        password: ''
      };
      expect(loginForm(initialState, payload)).to.deep.equal(expectedResponse);
    });
  });
  describe('Poll Form', () => {
    it('Returns the initial state', () => {
      const expectedResponse = {
        formType: 'Add',
        name: '',
        options: ['', '']
      };
      expect(pollForm(undefined, {})).to.deep.equal(expectedResponse);
    });
    it('Changes the form type', () => {
      const payload = {
        type: types.CHANGE_POLL_FORM_TYPE,
        formType: 'Edit'
      };
      const expectedResponse = {
        formType: 'Edit',
        name: '',
        options: ['', '']
      };
      expect(pollForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Changes the poll name', () => {
      const payload = {
        type: types.CHANGE_POLL_FORM_NAME,
        name: 'A New Poll'
      };
      const expectedResponse = {
        formType: 'Add',
        name: 'A New Poll',
        options: ['', '']
      };
      expect(pollForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Changes the an option on the poll', () => {
      const payload = {
        type: types.CHANGE_POLL_FORM_OPTION,
        value: 'yes',
        index: 1
      };
      const expectedResponse = {
        formType: 'Add',
        name: '',
        options: ['', 'yes']
      };
      expect(pollForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Adds an extra option to the form', () => {
      const payload = {
        type: types.ADD_POLL_FORM_OPTIONS_INPUT
      };
      const expectedResponse = {
        formType: 'Add',
        name: '',
        options: ['', '', '']
      };
      expect(pollForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Removes an option from the poll form', () => {
      const payload = {
        type: types.REMOVE_POLL_FORM_OPTIONS_INPUT,
        index: 1
      };
      const expectedResponse = {
        formType: 'Add',
        name: '',
        options: ['']
      };
      expect(pollForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Inserts options into the poll form when editing', () => {
      const payload = {
        type: types.INSERT_POLL_FORM_OPTIONS,
        options: ['yes', 'no']
      };
      const expectedResponse = {
        formType: 'Add',
        name: '',
        options: ['yes', 'no']
      };
      expect(pollForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Inserts options into the poll form when editing', () => {
      const payload = {
        type: types.CLEAR_POLL_FORM
      };
      const initialState = {
        formType: 'Edit',
        name: 'A New Poll',
        options: ['yes', 'no']
      };
      const expectedResponse = {
        formType: 'Add',
        name: '',
        options: ['', '']
      };
      expect(pollForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
  });
  describe('Polls Page', () => {
    it('Returns the initial state', () => {
      expect(pollsPage(undefined, {})).to.equal(1);
    });
    it('Changes the polls page to the passed in number', () => {
      const payload = {
        type: types.CHANGE_POLLS_PAGE,
        pageNumber: 4
      };
      expect(pollsPage(undefined, payload)).to.equal(4);
    });
    it('Changes the polls page to the next page', () => {
      const payload = {
        type: types.NEXT_POLLS_PAGE
      };
      expect(pollsPage(undefined, payload)).to.equal(2);
    });
    it('Changes the polls page to the previous page', () => {
      const payload = {
        type: types.PREVIOUS_POLLS_PAGE
      };
      expect(pollsPage(10, payload)).to.equal(9);
    });
  });
  describe('Polls', () => {
    it('Returns the initial state', () => {
      expect(polls(undefined, {})).to.be.an('array');
      expect(polls(undefined, {})).to.have.lengthOf(0);
    });
    it('Adds a poll', () => {
      const payload = {
        type: types.ADD_POLL,
        payload: {
          name: 'A New Poll',
          options: {
            yes: 0,
            no: 0
          },
          submitter: 'unchained'
        }
      };
      const expectedResponse = [{
        name: 'A New Poll',
        options: {
          yes: 0,
          no: 0
        },
        submitter: 'unchained'
      }];
      expect(polls(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Deletes a poll', () => {
      const payload = {
        type: types.DELETE_POLL,
        pollName: 'A New Poll 1'
      };
      const initialState = [{
        name: 'A New Poll',
        options: {
          yes: 0,
          no: 0
        },
        submitter: 'unchained'
      },{
        name: 'A New Poll 1',
        options: {
          yes: 0,
          no: 0
        },
        submitter: 'unchained'
      },{
        name: 'A New Poll 2',
        options: {
          yes: 0,
          no: 0
        },
        submitter: 'unchained'
      }];
      const expectedResponse = [{
        name: 'A New Poll',
        options: {
          yes: 0,
          no: 0
        },
        submitter: 'unchained'
      },{
        name: 'A New Poll 2',
        options: {
          yes: 0,
          no: 0
        },
        submitter: 'unchained'
      }];
      expect(polls(initialState, payload)).to.deep.equal(expectedResponse);
    });
    it('Edits a poll', () => {
      const payload = {
        type: types.EDIT_POLL,
        pollName: 'A New Poll',
        payload: {
          name: 'A New Poll',
          options: {
            yes: 0,
            no: 1,
            howdy: 0
          },
          submitter: 'unchained'
        }
      };
      const initialState = [{
        name: 'A New Poll',
        options: {
          yes: 0,
          no: 1
        },
        submitter: 'unchained'
      }];
      const expectedResponse = [{
        name: 'A New Poll',
        options: {
          yes: 0,
          no: 1,
          howdy: 0
        },
        submitter: 'unchained'
      }];
      expect(polls(initialState, payload)).to.deep.equal(expectedResponse);
    });
    it('Changes the polls selected option', () => {
    const payload = {
      type: types.CHANGE_SELECTED_OPTION,
      pollName: 'A New Poll',
      option: 'yes'
    };
    const initialState = [{
      name: 'A New Poll',
      options: {
        yes: 0,
        no: 0
      },
      submitter: 'unchained',
      selectedOption: 'select'
    }];
    const expectedResponse = [{
      name: 'A New Poll',
      options: {
        yes: 0,
        no: 0
      },
      submitter: 'unchained',
      selectedOption: 'yes'
    }];
    expect(polls(initialState, payload)).to.deep.equal(expectedResponse);
    });
    it('Votes on a poll', () => {
      const payload = {
        type: types.VOTE_ON_POLL,
        pollName: 'A New Poll',
        option: 'yes'
      };
      const initialState = [{
        name: 'A New Poll',
        options: {
          yes: 0,
          no: 0
        },
        submitter: 'unchained'
      }];
      const expectedResponse = [{
        name: 'A New Poll',
        options: {
          yes: 1,
          no: 0
        },
        submitter: 'unchained'
      }];
      expect(polls(initialState, payload)).to.deep.equal(expectedResponse);
    });
  });
  describe('Signup Form', () => {
    it('Returns the initial state', () => {
      const expectedResponse = {
        username: '',
        name: '',
        password: ''
      };
      expect(signupForm(undefined, {})).to.deep.equal(expectedResponse);
    });
    it('Changes the username', () => {
      const payload = {
        type: types.CHANGE_SIGNUP_USERNAME,
        value: 'unchained'
      };
      const expectedResponse = {
        username: 'unchained',
        name: '',
        password: ''
      };
      expect(signupForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Changes the name', () => {
      const payload = {
        type: types.CHANGE_SIGNUP_NAME,
        value: 'django'
      };
      const expectedResponse = {
        username: '',
        name: 'django',
        password: ''
      };
      expect(signupForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Changes the password', () => {
      const payload = {
        type: types.CHANGE_SIGNUP_PASSWORD,
        value: 'password'
      };
      const expectedResponse = {
        username: '',
        name: '',
        password: 'password'
      };
      expect(signupForm(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Clears the signup form', () => {
      const payload = {
        type: types.CLEAR_SIGNUP_FORM
      };
      const initialState = {
        username: 'unchained',
        name: 'django',
        password: 'password'
      };
      const expectedResponse = {
        username: '',
        name: '',
        password: ''
      };
      expect(signupForm(initialState, payload)).to.deep.equal(expectedResponse);
    });
  });
  describe('Users Page', () => {
    it('Returns the initial state', () => {
      expect(usersPage(undefined, {})).to.equal(1);
    });
    it('Changes the polls page to the passed in number', () => {
      const payload = {
        type: types.CHANGE_USERS_PAGE,
        pageNumber: 4
      };
      expect(usersPage(undefined, payload)).to.equal(4);
    });
    it('Changes the polls page to the next page', () => {
      const payload = {
        type: types.NEXT_USERS_PAGE
      };
      expect(usersPage(undefined, payload)).to.equal(2);
    });
    it('Changes the polls page to the previous page', () => {
      const payload = {
        type: types.PREVIOUS_USERS_PAGE
      };
      expect(usersPage(10, payload)).to.equal(9);
    });
  });
  describe('Users', () => {
    it('Returns the initial state', () => {
      expect(users(undefined, {})).to.be.an('array');
      expect(users(undefined, {})).to.have.lengthOf(0);
    });
    it('Adds a user', () => {
      const payload = {
        type: types.ADD_USER,
        username: 'unchained'
      };
      const expectedResponse = [{
        username: 'unchained',
        ownPolls: []
      }];
      expect(users(undefined, payload)).to.deep.equal(expectedResponse);
    });
    it('Adds own poll to user', () => {
      const payload = {
        type: types.ADD_OWN_POLL,
        username: 'unchained',
        pollName: 'A New Poll'
      };
      const startingState = [{
        username: 'unchained',
        ownPolls: []
      }];
      const expectedResponse = [{
        username: 'unchained',
        ownPolls: ['A New Poll']
      }];
      expect(users(startingState, payload)).to.deep.equal(expectedResponse);
    });
    it('Deletes own poll from user', () => {
      const payload = {
        type: types.DELETE_OWN_POLL,
        username: 'unchained',
        pollName: 'A New Poll'
      };
      const startingState = [{
        username: 'unchained',
        ownPolls: ['A New Poll']
      }];
      const expectedResponse = [{
        username: 'unchained',
        ownPolls: []
      }];
      expect(users(startingState, payload)).to.deep.equal(expectedResponse);
    });
  });
});
