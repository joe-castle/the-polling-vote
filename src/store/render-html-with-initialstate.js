'use strict';

// const initialState = require('./store').getState();
const initialState = {
  polls: [{
    id: 1,
    submitter: 'jimmybob',
    name: 'Do you like hand cream?',
    options: {
      yes: 0,
      no: 0
    }
  },{
    id: 2,
    submitter: 'jimmybob',
    name: 'Whats the best way to jump?',
    options: {
      'with legs': 0,
      'with hands': 0
    }
  },{
    id: 3,
    submitter: 'jimmybob',
    name: 'How old are you?',
    options: {
      '0 - 5': 0,
      '6 - 11': 0,
      '12 - 17': 0,
      '18 - 24': 0,
      '25+': 0
    }
  }],
  users: {
    jimmybob: {
      name: 'Jim',
      ownPolls: [0]
    }
  }
}
const template = require('./template.js');

module.exports = (req, res) => {
  res.send(template(initialState));
}
