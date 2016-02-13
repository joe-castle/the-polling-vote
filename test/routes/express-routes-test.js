'use strict';

import request from 'supertest';
import {expect} from 'chai';

import client from '../../src/data/client';
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
        .expect(res => {
          expect(res.body).to.deep.equal({username: 'unchained', name:'django'})
        })
        .end(done);
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
        .expect(res => {
          expect(res.body).to.deep.equal({username: 'unchained', name:'django'})
        })
        .end(done);
    });
    it('Should return a 401 error if either the username or passwrod is incorrect', (done) => {
      request(app)
        .post('/login')
        .send({username: 'wrong', password: 'details'})
        .expect(401, done);
    });
  });
  describe('Get reqeust to /api/users', () => {
    it('Should return an array of active users', (done) => {
      request(app)
        .get('/api/users')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.an('array')
        })
        .end(done)
    });
  });
});
