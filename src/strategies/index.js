'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = require('../data/actions')('users');

passport.use(new LocalStrategy(
  (username, password, done) => {
    users.get(username)
      .then(user => {
        if (!user || user.password !== password) {
          return done(null, false);
        }
        return done(null, {username: user.username, name: user.name});
      })
      .catch(err => done(err))
  }
));

module.exports = passport;
