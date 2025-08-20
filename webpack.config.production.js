const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  mode: 'production',
  entry: path.join(CURRENT_WORKING_DIR, 'client/main.js'),
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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
