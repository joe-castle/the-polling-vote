'use strict';

const client = require('./client');
const dbGet = require('./get');

module.exports = (state) => (
  client.set('state', JSON.stringify(data))
);
