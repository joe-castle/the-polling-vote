'use strict';

const polls = require('../data/actions')('polls');
const Users = require('./users');

class Poll {
  constructor(name, options, submitter, voted) {
    this.name = name.trim() || '';
    this.options = options || {};
    this.submitter = submitter || '';
    this.voted = voted || [];
  }
  edit(newOptions) {
    this.options = init.formatOptions(newOptions, this.options)
    this.saveToDB();
    return this;
  }
  vote(option, ip) {
    this.options[option] += 1;
    this.voted.push(ip);
    this.saveToDB();
    return this;
  }
  hasVoted(ip) {
    return this.voted.find(x => x === ip)
  }
  format() {
    return init.format(this);
  }
  saveToDB() {
    polls.set(init.toCamelCase(this.name), this);
    return this;
  }
}

const init = (
  name,
  options,
  submitter,
  voted
) => (
  new Poll(name, options, submitter, voted)
);

init.get = (pollName) => (
  polls.get(init.toCamelCase(pollName))
    .then(poll => init(
      poll.name, poll.options, poll.submitter, poll.voted
    ))
);

init.edit = (req, res) => {
  init.get(req.body.pollName)
    .then(poll => {
      poll.edit(req.body.newOptions);
      res.json(poll.format());
    })
    .catch(err => {
      res.status(400).send('Unable to find poll, please check the name and try again');
    })
}

init.delete = (req, res) => {
  Users.get(req.user.username).
    then(user => {
      user.deletePoll(req.body.pollName);
      polls.del(init.toCamelCase(req.body.pollName));
      res.json(user.username);
    })
}

init.getAll = (req, res) => {
  if (!req) {return polls.getAll()}
  polls.getAll().then(polls => {
    if (polls) {polls = polls.map(init.format)}
    res.json(polls || {'no-data': 'No active polls found'})
  });
};

init.exists = (pollName) => (
  polls.exists(init.toCamelCase(pollName))
);

init.create = (req, res) => {
  init.exists(req.body.pollName)
    .then(exists => {
      if (exists) {
        res.status(409).send('A poll with that name already exists, please try again.');
      } else {
        const poll = init(
          req.body.pollName,
          init.formatOptions(req.body.options, {}),
          req.user.username
        );
        Users.get(req.user.username)
          .then(user => {
            user.addPoll(poll.name);
            poll.saveToDB();
            res.status(201).json(poll.format());
          })
      }
    });
};

init.vote = (req, res) => {
  init.get(req.body.pollName)
    .then(poll => {
      if (poll.hasVoted(req.ip)) {
        res.status(409).send('Sorry, you can only vote on a poll once.');
      } else {
        poll.vote(req.body.option, req.ip);
        res.json(init.format(poll));
      }
    })
}

init.format = (poll) => ({
  name: poll.name,
  options: poll.options,
  submitter: poll.submitter
});

init.formatOptions = (newOptions, oldOptions) => (
  newOptions.reduce((x, y) => {
    if (y) {
      return Object.assign(x, {[y]: oldOptions[y] || 0})
    }
    return x;
  }, {})
)

init.toCamelCase = (name) => (
  name.trim()
    .toLowerCase()
    .replace(/[^\s[a-z]/ig, '')
    .replace(
      /(?:\s+([a-z]))/ig,
      (match) => match.substring(match.length-1).toUpperCase()
    )
)

module.exports = init;
