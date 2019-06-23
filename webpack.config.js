const path = require('path');

const assign = require('lodash/assign');

const baseConfig = {
  module: {
    rules: [
      {
        test: /(\.jsx)|(\.js)$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/transform-react-jsx-source',
              'transform-react-handled-props',
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'example'),
    port: 9000,
  },
  devtool: 'source-map',
};

const config = assign(
  {
    entry: {
      calendar: './example/calendar.js',
    },
    output: {
      path: path.resolve(__dirname, 'example'),
      filename: '[name].bundle.js',
    },
    mode: 'development',
  },
  baseConfig,
);
module.exports = config;
