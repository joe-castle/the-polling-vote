'use strict';

const template = require('./template.js');
const polls = require('../data/actions')('polls');
const users = require('../data/actions')('users');

module.exports = (req, res) => {
  req.polls.then(polls => {
    req.users.then(users => {
      let initialState = {}
      if (req.user) {initialState.authedUser = req.user}
      if (polls) {initialState.polls = polls.map(x => {
        delete x.voted;
        return x;
      })};
      if (users) {initialState.users = users.map(x => ({
        username: x.username,
        ownPolls: x.ownPolls
      }))};
      res.send(template(initialState));
    })
  })
}
