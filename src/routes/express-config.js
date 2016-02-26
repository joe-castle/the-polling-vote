'use strict';

const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const passport = require('../strategies/local');
const client = require('../data/client');

const router = require('./express-router');

app.set('trust proxy', true);
app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  store: new RedisStore({client}),
  secret: 'NEEDS TO BE CHANGED',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

module.exports = app;
