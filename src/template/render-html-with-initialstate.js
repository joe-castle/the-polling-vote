'use strict';

const template = require('./template.js');
const Users = require('../models/users');
const Polls = require('../models/polls');

module.exports = (req, res) => {
  Polls.getAll().then(polls => {
    Users.getAll().then(users => {
      let initialState = {}
      if (req.user) {initialState.authedUser = req.user}
      if (polls) {initialState.polls = polls.map(x => Polls.format(x))}
      if (users) {initialState.users = users.map(x => Users.format(x))}
      res.send(template(initialState));
    })
  })
}
