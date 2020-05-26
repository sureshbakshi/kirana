const Dotenv = require('dotenv-webpack');
var webpack = require('webpack')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
      new Dotenv({
        path: './.env.prod',
      }),
      // ENV variables
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_DOMAIN': JSON.stringify('https://api.kwizzy.com/'),

      }
    }),
    ],
  };