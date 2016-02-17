'use strict';

import request from 'supertest';
import {expect} from 'chai';

import client from '../../src/data/client';
import Users from '../../src/models/users';
import Polls from '../../src/models/polls';
import app from '../../src/routes/express-config';

const agent = request.agent(app);

describe('Express Routes', () => {
  beforeEach(() => { client.flushdb(); });
  afterEach(() => { client.flushdb(); });

  describe('Get request to /', () => {
    it('Returns 200 status', (done) => {
      agent.get('/')
        .expect(200, done)
    });
    it('Returns a Content-Type of HTML', (done) => {
      agent.get('/')
        .expect('Content-Type', /html/, done)
    });
    it('Should return HTML with initial state', (done) => {
      const user = Users('unchained', 'django', 'password')
        .saveToDB();
      const poll = Polls('A New Poll', {yes: 0, no: 0}, 'unchained')
        .saveToDB();

      agent.get('/')
        .end((err, res) => {
          expect(res.text).to.contain('window.__INITIAL_STATE__');
          expect(res.text).to.contain(JSON.stringify(Users.format(user)));
          expect(res.text).to.contain(JSON.stringify(poll.format()));
          done();
        })
    });
  });
  describe('Post request to /signup', () => {
    const newUser = Users('unchained', 'django', 'password');
    it(`Should signup a new user and return their username/name
      if the username doesn't exist`, (done) => {
      agent.post('/signup')
        .send(newUser)
        .expect(201)
        .expect({username: 'unchained', name:'django'}, done);
    });
    it('Should return a 409 status error if the username already exists', (done) => {
      newUser.saveToDB();
      agent.post('/signup')
        .send(newUser)
        .expect(409, done);
    });
    it('Should return a 400 error if username, name or password are missing', (done) => {
      agent.post('/signup')
        .send({username: 'hey'})
        .expect(400, done);
    });
  });
  describe('Post request to /login', () => {
    it(`Should login a user if their username and password is correct.
      Then return their username / name`, (done) => {
      Users('unchained', 'django', 'password')
        .encryptPassword()
        .saveToDB();

      agent.post('/login')
        .send({username: 'unchained', password: 'password'})
        .expect(200)
        .expect({username: 'unchained', name:'django'}, done);
    });
    it(`Should return a 401 error if either the username
      or passwrod is incorrect`, (done) => {
      agent.post('/login')
        .send({username: 'wrong', password: 'details'})
        .expect(401, done);
    });
  });
  describe('Get reqeust to /api/users', () => {
    it('Should return 200 status', (done) => {
      agent.get('/api/users')
        .expect(200, done);
    });
    it('Should a Content-Type of JSON', (done) => {
      agent.get('/api/users')
        .expect('Content-Type', /json/, done)
    });
    it('Should return no data found when there are no active users', (done) => {
      agent.get('/api/users')
        .expect({'no-data': 'No active users found'}, done)
    })
    it(`Should return an array of active users, containing only their
      username and created polls`, (done) => {
      const user = Users('unchained', 'django', 'password')
        .saveToDB();

      agent.get('/api/users')
        .expect(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.deep.equal(Users.format(user))
        })
        .end(done)
    });
  });
  describe('Get request to /api/polls', () => {
    it('Should return 200 status', (done) => {
      agent.get('/api/polls')
        .expect(200, done);
    });
    it('Returns a Content-Type of JSON', (done) => {
      agent.get('/api/polls')
        .expect('Content-Type', /json/, done)
    });
    it('Should return no data found when there are no active polls', (done) => {
      agent.get('/api/polls')
        .expect({'no-data': 'No active polls found'}, done)
    });
    it(`Should return an array of active polls,
      containing only it's name, options and submitter`, (done) => {
      const poll = Polls('A New Poll', {yes: 0, no: 0}, 'unchained')
        .saveToDB();

      agent.get('/api/polls')
        .expect(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.deep.equal(poll.format())
        })
        .end(done)
    });
  });
  describe('Post request to /api/polls', () => {
    beforeEach(() => {
      Users('unchained', 'django', 'password').saveToDB();
    });
    it(`Should return a 201 status - and the formatted poll -
      if the poll doesn't exist`, (done) => {
      let expectedResponse = {
        name: 'A New Poll',
        options: {
          yes: 0,
          no: 0
        },
        submitter: 'unchained'
      };

      agent.post('/api/polls')
        .send({pollName: 'A New Poll', options: ['yes', 'no']})
        .expect(201)
        .expect(expectedResponse, done);
    });
    it('Should save the poll to the database', (done) => {
      agent.post('/api/polls')
        .send({pollName: 'A New Poll', options: ['yes', 'no']})
        .end((err, res) => {
          Polls.exists('A New Poll')
            .then(exists => {
              expect(exists).to.equal(1);
              done();
            })
        });
    })
    it('Should return a 409 status if the poll already exists', (done) => {
      Polls('A New Poll', {yes: 0, no: 0}, 'unchained')
        .saveToDB();

      agent.post('/api/polls')
        .send({pollName: 'A New Poll', options: ['yes', 'no']})
        .expect(409, done);
    });
  });
  describe('Put request to /api/polls', () => {
    beforeEach(() => {
      Users('unchained', 'django', 'password').saveToDB();
    });
    it('Should return the edited poll', (done) => {
      Polls('A New Poll', {yes: 0, no: 0}, 'unchained')
        .saveToDB();

      const editedPoll = {
        pollName: 'A New Poll',
        newOptions: ['yes', 'no', 'maybe']
      }
      const expectedResponse = {
        name: 'A New Poll',
        options: {
          yes: 0, no: 0, maybe: 0
        },
        submitter: 'unchained'
      }
      agent.put('/api/polls')
        .send(editedPoll)
        .expect(expectedResponse, done)
    })
    it('Should return 400 if the poll doesn\'t exist', (done) => {
      agent.put('/api/polls')
        .send({pollName: 'fakename'})
        .expect(400)
        .expect('Unable to find poll, please check the name and try agian', done);
    });
  });
  describe('Delete request to /api/polls', () => {
    beforeEach(() => {
      Users('unchained', 'django', 'password').saveToDB();
    });
    it('It should delete the poll if it exists and return the username', (done) => {
      Polls('A New Poll', {yes: 0, no: 0}, 'unchained')
        .saveToDB();

      agent.delete('/api/polls')
        .send({pollName: 'A New Poll'})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.equal('unchained');
          Polls.exists('A New Poll')
            .then(exists => {
              expect(exists).to.equal(0)
              done();
            })
          }
        )
    });
  });
  describe('Put request to /api/polls/vote', () => {
    beforeEach(() => {
      Users('unchained', 'django', 'password').saveToDB();
    });
    it('Should return the poll with the updated vote count', (done) => {
      Polls('A New Poll', {yes: 0, no: 0}, 'unchained')
        .saveToDB();

      const expectedResponse = {
        name: 'A New Poll',
        options: {
          no: 0,
          yes: 1
        },
        submitter: 'unchained'
      }

      agent.put('/api/polls/vote')
        .send({pollName: 'A New Poll', option: 'yes'})
        .expect(200)
        .expect(expectedResponse, done)
    });
    it('Should return a 409 error if someone has already voted on a poll', (done) => {
      Polls('A New Poll', {yes: 0, no: 0}, 'unchained')
        .vote('yes', '::ffff:127.0.0.1')
        .saveToDB();

      agent.put('/api/polls/vote')
        .send({pollName: 'A New Poll', option: 'yes'})
        .expect(409, done)
    });
  });
});
