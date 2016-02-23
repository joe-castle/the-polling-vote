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
    return this;
  }
  deletePoll(pollName) {
    this.ownPolls = this.ownPolls.filter(x => x !== pollName);
    this.saveToDB();
    return this;
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
  users.get(username).then(user => init(
    user.username, user.name, user.password, user.ownPolls
  ))
);

init.create = (req, res, next) => {
  if (!req.body.username || !req.body.name || !req.body.password) {
    res.status(400).send('Please provide a username, name and password to signup.');
  } else {
    users.exists(req.body.username)
      .then(exists => {
        if (exists) {
          res.status(409).send('A user with that username already exists, please try again.');
        } else {
          const user = init(
            req.body.username,
            req.body.name,
            req.body.password
          );
          user.encryptPassword().saveToDB();
          req.login(user, (err) => {if (err) {console.log(err)}});
          res.status(201).json(user.format());
        }
      });
  }
};

init.format = (user) => ({
  username: user.username,
  ownPolls: user.ownPolls
});

module.exports = init;
