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
    this.options = Polls.formatOptions(newOptions, this.options)
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
    return Polls.format(this);
  }
  saveToDB() {
    polls.set(Polls.toCamelCase(this.name), this);
    return this;
  }
}

const Polls = (
  name,
  options,
  submitter,
  voted
) => (
  new Poll(name, options, submitter, voted)
);

Polls.get = (pollName) => (
  polls.get(Polls.toCamelCase(pollName))
    .then(poll => Polls(
      poll.name, poll.options, poll.submitter, poll.voted
    ))
);

Polls.edit = (req, res) => {
  Polls.get(req.body.pollName)
    .then(poll => {
      poll.edit(req.body.newOptions);
      res.json(poll.format());
    })
    .catch(err => {
      res.status(400).send('Unable to find poll, please check the name and try again');
    })
}

Polls.delete = (req, res) => {
  Users.get(req.user.username).
    then(user => {
      user.deletePoll(req.body.pollName);
      polls.del(Polls.toCamelCase(req.body.pollName));
      res.json(user.username);
    })
}

Polls.getAll = (req, res) => {
  if (!req) {return polls.getAll()}
  polls.getAll().then(polls => {
    if (polls) {polls = polls.map(Polls.format)}
    res.json(polls || {'no-data': 'No active polls found'})
  });
};

Polls.exists = (pollName) => (
  polls.exists(Polls.toCamelCase(pollName))
);

Polls.create = (req, res) => {
  Polls.exists(req.body.pollName)
    .then(exists => {
      if (exists) {
        res.status(409).send('A poll with that name already exists, please try again.');
      } else {
        const poll = Polls(
          req.body.pollName,
          Polls.formatOptions(req.body.options, {}),
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

Polls.vote = (req, res) => {
  Polls.get(req.body.pollName)
    .then(poll => {
      if (poll.hasVoted(req.ip)) {
        res.status(409).send('Sorry, you can only vote on a poll once.');
      } else {
        poll.vote(req.body.option, req.ip);
        res.json(Polls.format(poll));
      }
    })
}

Polls.format = (poll) => ({
  name: poll.name,
  options: poll.options,
  submitter: poll.submitter
});

Polls.formatOptions = (newOptions, oldOptions) => (
  newOptions.reduce((x, y) => {
    if (y) {
      return Object.assign(x, {[y]: oldOptions[y] || 0})
    }
    return x;
  }, {})
)

Polls.toCamelCase = (name) => (
  name.trim()
    .toLowerCase()
    .replace(/[^\s[a-z]/ig, '')
    .replace(
      /(?:\s+([a-z]))/ig,
      (match) => match.substring(match.length-1).toUpperCase()
    )
)

module.exports = Polls;
