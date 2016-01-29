const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  hot: true,
  stats: { colors: true },
  proxy: {
    '*': 'http://localhost:3000'
  }
})
.listen(3001, 'localhost', (err, result) => {
  if (err) {
    console.log(`Error: ${err}`);
  }
  console.log('Webpack-dev-server listening on port:', 3001);
});
