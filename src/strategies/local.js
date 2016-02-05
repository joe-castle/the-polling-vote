'use strict';

const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = require('../data/actions')('users');

passport.use(new LocalStrategy(
  (username, password, done) => {
    users.get(username)
      .then(user => {
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) { throw err; }
          if (!res) { return done(null, false); }
          return done(null, {username: user.username, name: user.name});
        })
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
