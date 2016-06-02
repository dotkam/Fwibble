var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/views/index.html',
  filename: 'index.html',
  inject: 'body'
});
var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'dist');
var mainPath = path.resolve(__dirname, 'server', 'App.js');


module.exports = {
  entry: [
    mainPath
  ],

  output: {
    filename: 'bundle.js',
    path: buildPath
  },
  
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.png$/, loader: 'file-loader'}
    ]
  },

  plugins: [
    HTMLWebpackPluginConfig, 
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};