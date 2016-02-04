'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const polls = require('../data/actions')('polls', true);
const users = require('../data/actions')('users', false);
const createPoll = require('../utils/create-poll');

app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());
// app.get('*', (req, res) => res.sendFile(`${__dirname}/../public/index.html`));

app.route('/api/polls')
  .get((req, res) => {
    polls.getAll()
      .then(polls => res.json(polls || {'no-data': 'No active polls found'}));
  })
  .post((req, res) => {
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
  .put((req, res) => {
    polls.get(req.body.pollName)
      .then(poll => {
        poll = Object.assign(
          poll, createPoll(req.body.pollName, req.body.newOptions, poll.options)
        );
        polls.set(poll.name, poll);
        res.json(poll);
      })
  })
  .delete((req, res) => {
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

app.post('/login', (req, res) => {

});

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
        users.set(req.body.username, user);
        res.status(201).json(user);
      }
    })
});

module.exports = app;
