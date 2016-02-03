'use strict';

import client from './client';

export default (state) => (
  client.set('state', JSON.stringify(state))
);
