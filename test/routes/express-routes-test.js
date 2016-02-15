'use strict';

import request from 'supertest';
import {expect} from 'chai';

import client from '../../src/data/client';
import Users from '../../src/models/users';
import Polls from '../../src/models/polls';
import app from '../../src/routes/express-config';

describe('Express Routes', () => {
  before(() => {
    client.flushdb();
  });
  after(() => {
    client.flushdb();
  });
  describe('Get request to /', () => {
    it('Returns 200 status', (done) => {
      request(app)
        .get('/')
        .expect(200, done)
    });
    it('Returns a Content-Type of HTML', (done) => {
      request(app)
        .get('/')
        .expect('Content-Type', /html/, done)
    });
    it('Should return HTML with initial state')
  });
  describe('Post request to /signup', () => {
    it('Should signup a new user and return their username/name', (done) => {
      request(app)
        .post('/signup')
        .send({username: 'unchained', name: 'django', password: 'password'})
        .expect(201)
        .expect({username: 'unchained', name:'django'}, done);
    });
    it('Should return a 409 status error if the username already exists', (done) => {
      request(app)
        .post('/signup')
        .send({username: 'unchained', name: 'django', password: 'password'})
        .expect(409, done);
    });
    it('Should return a 400 error if username, name or password are missing', (done) => {
      request(app)
        .post('/signup')
        .send({username: 'hey'})
        .expect(400, done);
    });
  });
  describe('Post request to /login', () => {
    it(`Should login a user if their username and password is correct.
      Then return their username / name`, (done) => {
      request(app)
        .post('/login')
        .send({username: 'unchained', password: 'password'})
        .expect(200)
        .expect({username: 'unchained', name:'django'}, done);
    });
    it('Should return a 401 error if either the username or passwrod is incorrect', (done) => {
      request(app)
        .post('/login')
        .send({username: 'wrong', password: 'details'})
        .expect(401, done);
    });
  });
  describe('Get reqeust to /api/users', () => {
    before(() => {
      client.flushdb()
    });
    it('Should retrun no data found when there are no active users', (done) => {
      request(app)
        .get('/api/users')
        .expect(200)
        .expect({'no-data': 'No active users found'}, done)
    })
    it(`Should return an array of active users, containing only their
      username and created polls`, (done) => {
      let user = Users('unchained', 'django', 'password').saveToDB();
      request(app)
        .get('/api/users')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.deep.equal(Users.format(user))
        })
        .end(done)
    });
  });
  describe('Get request to /api/polls', () => {
    before(() => {
      client.flushdb()
    });
    it('Should return no data found when there are no active polls', (done) => {
      request(app)
        .get('/api/polls')
        .expect(200)
        .expect({'no-data': 'No active polls found'}, done)
    });
    it(`Should return an array of active polls,
      containing only it's name, options and submitter`, (done) => {
      let poll = Polls('A New Poll', {yes: 0, no: 0}, 'unchained').saveToDB();
      request(app)
        .get('/api/polls')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.deep.equal(Polls.format(poll))
        })
        .end(done)
    });
  });
});
