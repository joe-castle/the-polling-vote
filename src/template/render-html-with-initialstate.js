'use strict';

const template = require('./template.js');
const Users = require('../models/users');
const Polls = require('../models/polls');

module.exports = (req, res) => {
  Polls.getAll().then(polls => {
    Users.getAll().then(users => {
      let initialState = {}
      if (req.user) {initialState.authedUser = req.user}
      if (polls) {initialState.polls = polls.map(Polls.format)}
      if (users) {initialState.users = users.map(Users.format)}
      res.send(template(initialState));
    })
  })
}
