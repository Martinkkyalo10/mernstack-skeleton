const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const CURRENT_WORKING_DIR = process.cwd();
const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  name: 'browser',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: [
    isDevelopment && 'webpack-hot-middleware/client?reload=true&timeout=1000',
    path.join(CURRENT_WORKING_DIR, 'client/main.js'),
  ].filter(Boolean),
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment &&
      new ReactRefreshWebpackPlugin({
        overlay: false, // 🚀 important: disable default WDS overlay
      }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
