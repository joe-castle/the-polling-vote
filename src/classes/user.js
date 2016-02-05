'use strict';

const bcrypt = require('bcrypt');

class User {
  constructor(username, name, password, ownPolls) {
    this.username = username || '';
    this.password = password || '';
    this.name = name || '';
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
  }
}

module.exports = (
  username,
  name,
  password,
  ownPolls
) => (
  new User(username, name, password, ownPolls)
);
