'use strict';

const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const passport = require('../strategies/local');
const client = require('../data/client');
const renderHtmlWithInitialState = require('../template/render-html-with-initialstate');
const ensureAuthenticated = require('../middleware').ensureAuthenticated;

const Users = require('../models/users');
const Polls = require('../models/polls');

app.set('trust proxy', true);
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

app.route('/api/polls')
  .get(Polls.getAll)
  .post(ensureAuthenticated, Polls.exists, (req, res) => {
    Users.get(req.user.username)
      .then(renameme => {
        renameme.addPoll(req.poll.name);
        req.poll.saveToDB();
        res.status(201).json(req.poll.format());
      })
  })
  .put(ensureAuthenticated, (req, res) => {
    Polls.get(req.body.pollName)
      .then(poll => {
        poll.edit(req.body.newOptions);
        res.json(poll);
      })
  })
  .delete(ensureAuthenticated, (req, res) => {
    Users.get(req.user.username).then(renameme => {
      renameme.deletePoll(req.body.pollName);
      Polls.del(req.body.pollName);
      res.json(renameme.username);
    })
  });

app.put('/api/polls/vote', (req, res) => {
  Polls.get(req.body.pollName)
    .then(poll => {
      if (poll.hasVoted(req.ip)) {
        res.status(409).send('Sorry, you can only vote on a poll once.');
      } else {
        poll.vote(req.body.option, req.ip);
        res.json(poll);
      }
    })
});

app.get('/api/users', Users.getAll);

app.post('/signup', Users.exists, (req, res) => {
  req.renameme.encryptPassword().saveToDB();
  req.login(req.renameme, (err) => {if (err) {console.log(err)}});
  res.status(201).json(req.renameme.format());
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json(req.user);
});

app.post('/logout', (req, res) => {
  req.logout();
  res.end();
})

app.use('*', renderHtmlWithInitialState);

module.exports = app;
