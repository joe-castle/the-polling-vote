'use strict';

import client from './client';

export default (
  client.getAsync('state')
    .then(res => (JSON.parse(res) || {}))
);
