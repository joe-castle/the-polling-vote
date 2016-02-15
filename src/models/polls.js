'use strict';

const polls = require('../data/actions')('polls');

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
  }
  vote(option, ip) {
    this.options[option] += 1;
    this.voted.push(ip);
    this.saveToDB();
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
  polls.get(init.toCamelCase(pollName)).then(poll => init(
    poll.name, poll.options, poll.submitter, poll.voted
  ))
);

init.del = (pollName) => {
  polls.del(init.toCamelCase(pollName));
}

init.getAll = (req, res) => {
  if (!req) {return polls.getAll()}
  polls.getAll().then(polls => {
    if (polls) {polls = polls.map(init.format)}
    res.json(polls || {'no-data': 'No active polls found'})
  });
};

init.exists = (req, res, next) => {
  polls.exists(req.body.pollName)
    .then(exists => {
      if (exists) {
        res.status(409).send('A poll with that name already exists, please try again.');
      } else {
        req.poll = init(
          req.body.pollName,
          init.formatOptions(req.body.options, {}),
          req.user.username
        );
        next();
      }
    });
};

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
