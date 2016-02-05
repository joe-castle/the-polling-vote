'use strict';

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send('This actions requires authentication, please login and try again');
  }
}

const session = require('express-session')
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const passport = require('../strategies/local');
const client = require('../data/client');

const polls = require('../data/actions')('polls', true);
const users = require('../data/actions')('users', false);
const createPoll = require('../utils/create-poll');

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

app.route('/api/polls')
  .get((req, res) => {
    polls.getAll()
      .then(polls => {
        res.json(polls || {'no-data': 'No active polls found'})
      });
  })
  .post(ensureAuthenticated, (req, res) => {
    polls.exists(req.body.pollName)
      .then(exists => {
        if (exists) {
          res.status(409).send('A poll with that name already exists, please try again.');
        } else {
          let poll = createPoll(req.body.pollName, req.body.options, {})
          poll.submitter = 'joesmith'
          polls.set(poll.name, poll);
          res.status(201).json(poll);
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
    // Delete ownpoll from user as well.
    polls.del(req.body.pollName);
    res.json(req.body);
  });
// Only allow 1 vote per IP/User?
app.put('/api/polls/vote', (req, res) => {
  polls.get(req.body.pollName)
    .then(poll => {
      poll.options[req.body.option] += 1;
      polls.set(poll.name, poll);
      res.json(poll);
    })
});

app.get('/api/users', (req, res) => {
  users.getAll()
    .then(users => {
      if (users) {users = users.map(x => ({
        username: x.username,
        ownPolls: x.ownPolls
      }))}
      res.json(users || {'no-data': 'No active users found'})
    });
});

app.get('/currentuser', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({username: req.user.username, name: req.user.name})
  } else {
    res.json({username: '', name: ''});
  }
});

app.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json(req.user);
  }
);

app.post('/signup', (req, res) => {
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

// app.get('*', (req, res) => res.sendFile(`${__dirname}/../public/index.html`));

module.exports = app;
