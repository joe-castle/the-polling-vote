'use strict';

const template = require('./template.js');
const polls = require('../data/actions')('polls');
const users = require('../data/actions')('users');

module.exports = (req, res) => {
  polls.getAll()
    .then(polls => {
      users.getAll()
        .then(users => {
          let initialState = {polls, users: users.map(x => ({
            username: x.username,
            ownPolls: x.ownPolls
          }))};
          if (req.user) {
            initialState.authedUser = req.user
          }
          res.send(template(initialState));
        })
    })
}
