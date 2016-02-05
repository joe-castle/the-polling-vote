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

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  users.get(username)
    .then(user => done(null, {username: user.username, name: user.name}));
});

module.exports = passport;
