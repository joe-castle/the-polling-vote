'use strict';

import client from './client';

export default (dbString, state) => (
  client.set(dbString, JSON.stringify(state))
);
