const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, './index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'recoil-lite': path.resolve(__dirname, '../src'),
    },
  },
  devServer: {
    port: 3800,
    host: 'localhost',
    inline: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js|ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './index.html'),
      chunks: ['index'],
      inject: true,
    }),
  ],
};
