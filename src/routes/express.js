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
const encryptPassword = require('../middleware').encryptPassword;

const polls = require('../data/actions')('polls', true);
const users = require('../data/actions')('users', false);
const createPoll = require('../utils/create-poll');

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
  .get(polls.getAll, (req, res) => {
    req.polls.then(polls => {
      if (polls) {polls = polls.map(x => {
        delete x.voted;
        return x;
      })};
      res.json(polls || {'no-data': 'No active polls found'})
    });
  })
  .post(ensureAuthenticated, (req, res) => {
    polls.exists(req.body.pollName)
      .then(exists => {
        if (exists) {
          res.status(409).send('A poll with that name already exists, please try again.');
        } else {
          users.get(req.user.username)
            .then(user => {
              let poll = createPoll(req.body.pollName, req.body.options, {})
              poll.submitter = req.user.username;

              user.ownPolls.push(poll.name);

              users.set(req.user.username, user);
              polls.set(poll.name, poll);
              res.status(201).json(poll);
            })
        }
      })
  })
  .put(ensureAuthenticated, (req, res) => {
    polls.get(req.body.pollName)
      .then(poll => {
        poll = Object.assign(
          poll, createPoll(req.body.pollName, req.body.newOptions, poll.options)
        );
        polls.set(poll.name, poll);
        res.json(poll);
      })
  })
  .delete(ensureAuthenticated, (req, res) => {
    users.get(req.user.username)
      .then(user => {
        user.ownPolls = user.ownPolls.filter(x => x !== req.body.pollName);
        users.set(req.user.username, user);

        polls.del(req.body.pollName);
        res.json(req.user.username);
      })
  });
// Only allow 1 vote per IP/User?
app.put('/api/polls/vote', (req, res) => {
  polls.get(req.body.pollName)
    .then(poll => {
      if (!poll.voted.find(x => x === req.ip)) {
        poll.options[req.body.option] += 1;
        poll.voted.push(req.ip);
        polls.set(poll.name, poll);
        res.json(poll);
      } else {
        res.status(409).send('Sorry, you can only vote on a poll once.');
      }
    })
});

app.get('/api/users', users.getAll, (req, res) => {
  req.users.then(users => {
    if (users) {users = users.map(x => ({
      username: x.username,
      ownPolls: x.ownPolls
    }))}
    res.json(users || {'no-data': 'No active users found'})
  });
});

app.post('/signup', encryptPassword, (req, res) => {
  users.exists(req.body.username)
    .then(exists => {
      if (exists) {
        res.status(409).send('A user with that username already exists, please try again.');
      } else {
        const user = {
          username: req.body.username,
          name: req.body.name,
          ownPolls: [],
          password: req.body.password
        }
        req.login(user, (err) => {
          if (err) {console.log(err)}
        });
        users.set(req.body.username, user);
        res.status(201).json(user);
      }
    })
});

app.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json(req.user);
  }
);

app.post('/logout', (req, res) => {
  req.logout();
  res.end();
})

app.use('*',
  polls.getAll,
  users.getAll,
  renderHtmlWithInitialState
);

// app.get('*', (req, res) => res.sendFile(`${__dirname}/../public/index.html`));

module.exports = app;
