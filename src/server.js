'use strict';

const app = require('./routes/express-config');

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log('Express server listening on port:', port)
);
