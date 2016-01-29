'use strict';

const client = require('./client');

module.exports = (
  client.getAsync('state')
    .then(res => (JSON.parse(res) || {}))
);
