'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const polls = require('../data/actions')('polls');
const createPoll = require('../utils/create-poll');

app.use(express.static(`${__dirname}/../public`));
app.use(bodyParser.json());
// app.get('*', (req, res) => res.sendFile(`${__dirname}/../public/index.html`));

app.route('/api/polls')
  .get((req, res) => {
    polls.getAll()
      .then(polls => {
        polls ?
          res.json(polls) :
          res.status(404).json({error: 'No active polls found'});
      })
  })
  .post((req, res) => {
    let o = req.body;
    polls.exists(o.pollName)
      .then(exists => {
        if (exists) {
          res.status(409).send('A poll with that name already exists, please try again.');
        } else {
          let poll = createPoll(o.pollName, o.options, {})
          poll.submitter = 'hayleyhayz'
          polls.set(poll.name, poll);
          res.status(201).json(poll);
        }
      })
  })
  .put((req, res) => {
    let o = req.body;
    if (o.type === 'edit') {
      polls.get(o.pollName)
        .then(poll => {
          poll = Object.assign(
            poll, createPoll(o.pollName, o.newOptions, poll.options)
          );
          polls.set(poll.name, poll);
          res.json(poll);
        })
    } else if (o.type === 'vote') {
      polls.get(o.pollName)
        .then(poll => {
          poll.options[o.option] += 1;
          polls.set(poll.name, poll);
          res.json(poll);
        })
    }
  })
  .delete((req, res) => {
    polls.del(req.body.pollName);
    res.json(req.body);
  })

app.post('/login', (req, res) => {

});

app.post('/signup', (req, res) => {

});

module.exports = app;
