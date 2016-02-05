'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

let entry, cssLoaders, jsLoaders = ['babel']
  , plugins = [
    new webpack.ProvidePlugin({
      // Injects Root and configureStore based on NODE_ENV.
      // Provides Redux devtools if in development,
      // and strips them if in production.
      // See /src/frontend/root.js.
      Root: './root',
      configureStore: './store/configure-store'
      // Currently using a CDN because materialize is being janky
      // $: 'jquery'
    })
  ];

if (process.env.NODE_ENV === 'production') {
  entry = './src/index';
  plugins = plugins.concat([
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      // Provides NODE_ENV to provide plugin, root and configure, through webpack.
      // This is only required for build.
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]);
  cssLoaders = ExtractTextPlugin.extract('style', 'css!postcss!sass');
} else {
  entry = [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './src/index'
  ];
  plugins.push(new webpack.HotModuleReplacementPlugin());
  jsLoaders.unshift('react-hot');
  cssLoaders = 'style!css!postcss!sass';
}

module.exports = {
  entry: entry,
  output: {
    path: `${__dirname}/../src/public`,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: plugins,
  module: {
    loaders: [
      { test: /\.js$/, loaders: jsLoaders, exclude: /node_modules/},
      { test: /\.scss$/, loader: cssLoaders },
      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file' }
    ]
  },
  postcss: () => [autoprefixer],
  devtool: 'source-map'
};
