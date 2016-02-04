'use strict';

import client from './client';

export default (dbString) => (
  client.getAsync(dbString)
    .then(res => (JSON.parse(res) || {}))
);
