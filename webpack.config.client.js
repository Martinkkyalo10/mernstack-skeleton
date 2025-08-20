const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  mode: 'production', // or 'development'
  entry: path.join(CURRENT_WORKING_DIR, 'client/main.js'),
  output: {
    path: path.join(CURRENT_WORKING_DIR, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // handle .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // transpile JSX
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // allow imports without file extension
  },
};
