'use strict';

import {promisifyAll} from 'bluebird';
import redis from 'redis';
promisifyAll(redis.RedisClient.prototype);

// If there is no REDISTOGO_URL, defaults to localhost, port 6379.
const client = redis.createClient(process.env.REDISTOGO_URL);
client.on('error', (err) => console.log(`Error ${err}`));

if (process.env.NODE_ENV === 'test') {
  client.select(1);
}

export default client;
