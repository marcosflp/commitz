var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var baseConfig = require('./webpack.base.config');
var BundleTracker = require('webpack-bundle-tracker');
var path = require('path');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');

baseConfig[0].mode = 'development';
baseConfig[1].mode = 'development';

baseConfig[1].entry = [
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  'whatwg-fetch',
  '@babel/polyfill',
  './frontend/js/index',
];

baseConfig[0].output['publicPath'] = 'http://localhost:3000/frontend/bundles/';
baseConfig[1].output = {
  path: path.resolve('./frontend/bundles/'),
  publicPath: 'http://localhost:3000/frontend/bundles/',
  filename: '[name].js',
};

baseConfig[1].module.rules.push(
  {
    test: /\.jsx?$/,
    exclude: [nodeModulesDir],
    loader: require.resolve('babel-loader'),
  },
  {
    test: /\.(woff(2)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=100000',
  }
);

baseConfig[1].plugins = [
  new webpack.EvalSourceMapDevToolPlugin({
    exclude: /node_modules/,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
  new BundleTracker({
    filename: './webpack-stats.json',
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: __dirname,
      postcss: [autoprefixer],
    },
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Tether: 'tether',
    'window.Tether': 'tether',
    Popper: ['popper.js', 'default'],
  }),
];

module.exports = baseConfig;
