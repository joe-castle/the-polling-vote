'use strict';

const client = require('./client');
const toCamelCase = require('../utils/toCamelCase');

module.exports = (hash, camelCase) => ({
  exists(field) {
    field = camelCase ? toCamelCase(field) : field;
    return client.hexistsAsync(hash, field)
      .catch(err => console.log(err));
  },
  set(field, value) {
    field = camelCase ? toCamelCase(field) : field;
    return client.hset(hash, field, JSON.stringify(value));
  },
  get(field) {
    field = camelCase ? toCamelCase(field) : field;
    return client.hgetAsync(hash, field)
      .then(res => JSON.parse(res) || null)
      .catch(err => console.log(err));
  },
  getAll() {
    return client.hgetallAsync(hash)
      .then(res => {
        if (res) {
          return Object.keys(res)
            .map(x => JSON.parse(res[x]))
        }
        return;
      })
      .catch(err => console.log(err));
  },
  del(field) {
    field = camelCase ? toCamelCase(field) : field;
    return client.hdel(hash, field);
  }
});
