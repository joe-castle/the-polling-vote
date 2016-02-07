'use strict';

const client = require('./client');

module.exports = (hash) => ({
  exists(field) {
    return client.hexistsAsync(hash, field)
      .catch(err => console.log(err));
  },
  set(field, value) {
    return client.hset(hash, field, JSON.stringify(value));
  },
  get(field) {
    return client.hgetAsync(hash, field)
      .then(res => JSON.parse(res) || null)
      .catch(err => console.log(err));
  },
  getAll() {
    return client.hgetallAsync(hash)
      .then(data => {
        if (data) {
          return Object.keys(data)
            .map(x => JSON.parse(data[x]))
        }
        return;
      })
      .catch(err => console.log(err));
  },
  del(field) {
    return client.hdel(hash, field);
  }
});
