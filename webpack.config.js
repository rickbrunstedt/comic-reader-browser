const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const production = process.env.NODE_ENV;
const mode = production === 'production' ? 'production' : 'development';

module.exports = {
  entry: './src/index.js',
  mode,

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyPlugin([{ from: 'public', to: '' }]),
  ],

  devServer: {
    contentBase: [path.join(__dirname, 'dist')],
  },
};
