const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const CURRENT_WORKING_DIR = process.cwd();
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  name: 'browser',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: [
    isDevelopment && 'webpack-hot-middleware/client?reload=true&timeout=1000',
    path.join(CURRENT_WORKING_DIR, 'client/main.js'),
  ].filter(Boolean),
  output: {
    path: path.join(CURRENT_WORKING_DIR, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment &&
      new ReactRefreshWebpackPlugin({
        overlay: false, // disable WDS overlay
      }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
