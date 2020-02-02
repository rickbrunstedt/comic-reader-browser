const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');

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

const config = {
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
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyPlugin([
      { from: 'public', to: '' },
      { from: 'node_modules/libarchive.js/dist', to: 'libarchivejs' },
    ]),
  ],

  devServer: {
    contentBase: [path.join(__dirname, 'dist')],
    historyApiFallback: true,
  },
};

if (production) {
  config.plugins.push(
    new GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    })
  );
}

module.exports = config;
