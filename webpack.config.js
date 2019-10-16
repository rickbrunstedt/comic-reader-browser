const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const production = process.env.NODE_ENV;
const mode = production === 'production' ? 'production' : 'development';

let modeSettings = {
  devtool: 'cheap-source-map',
};

if (!production) {
  modeSettings = {
    devtool: 'cheap-eval-source-map',
  };
}

module.exports = {
  entry: './src/main.js',
  mode,
  ...modeSettings,

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
    new CopyPlugin([
      { from: 'node_modules/libarchive.js/dist', to: 'libarchivejs' },
    ]),
  ],

  devServer: {
    contentBase: [path.join(__dirname, 'dist')],
  },
};
