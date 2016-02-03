'use strict';

const app = require('./routes');

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log('Express server listening on port:', port)
);

// React-Hot-Reload Server. For development only.
// if (process.env.NODE_ENV !== 'production') {
//   require('../webpack/webpack.devserver');
// }
