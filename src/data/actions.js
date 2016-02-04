'use strict';

const client = require('./client');
const toCamelCase = require('../utils/toCamelCase');

module.exports = (hash) => ({
  exists(field) {
    return client.hexistsAsync(hash, toCamelCase(field))
      .catch(err => console.log(err));
  },
  set(field, value) {
    return client.hset(hash, toCamelCase(field), JSON.stringify(value));
  },
  get(field) {
    return client.hgetAsync(hash, toCamelCase(field))
      .then(res => JSON.parse(res) || null)
      .catch(err => console.log(err));
  },
  getAll() {
    return client.hgetallAsync(hash)
      .then(res => {
        if (res) {return Object.keys(res).map(x => JSON.parse(res[x]))}
        return;
      })
      .catch(err => console.log(err));
  },
  del(field) {
    return client.hdel(hash, toCamelCase(field));
  }
});
