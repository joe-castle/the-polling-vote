'use strict';

const bcrypt = require('bcrypt');

const users = require('../data/actions')('users');

class User {
  constructor(username, name, password, ownPolls) {
    this.username = username || '';
    this.name = name || '';
    this.password = password || '';
    this.ownPolls = ownPolls || [];
  }
  format() {
    return {
      username: this.username,
      name: this.name
    }
  }
  encryptPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
    return this;
  }
  saveToDB() {
    users.set(this.username, this);
    return this;
  }
  addPoll(pollName) {
    this.ownPolls.push(pollName);
    this.saveToDB();
  }
  deletePoll(pollName) {
    this.ownPolls = this.ownPolls.filter(x => x !== pollName);
    this.saveToDB();
  }
}

const init = (
  username,
  name,
  password,
  ownPolls
) => (
  new User(username, name, password, ownPolls)
);

init.getAll = (req, res) => {
  if (!req) {return users.getAll()}
  users.getAll().then(users => {
    if (users) {users = users.map(init.format)}
    res.json(users || {'no-data': 'No active users found'})
  });
};

init.get = (username) => (
  users.get(username).then(x => init(
    x.username, x.name, x.password, x.ownPolls
  ))
)

init.exists = (req, res, next) => {
  users.exists(req.body.username)
    .then(exists => {
      if (exists) {
        res.status(409).send('A user with that username already exists, please try again.');
      } else {
        req.renameme = init(
          req.body.username,
          req.body.name,
          req.body.password
        );
        next();
      }
    });
};

init.format = (renameme) => ({
  username: renameme.username,
  ownPolls: renameme.ownPolls
});

module.exports = init;
