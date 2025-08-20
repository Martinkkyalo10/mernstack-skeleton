const path = require('path');
const CURRENT_WORKING_DIR = process.cwd();

const config = {
  mode: 'production',
  entry: [path.join(CURRENT_WORKING_DIR, 'client/main.js')],
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        // Babel loader to transpile JS/JSX
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Use presets for modern JS and React JSX
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        // File loader to handle images and fonts
        test: /\.(ttf|eot|svg|gif|jpg|jpeg|png)(\?[\s\S]+)?$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // Allows importing JS/JSX without extensions
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
