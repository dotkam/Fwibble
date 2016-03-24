var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/views/index.html',
  filename: 'index.html',
  inject: 'body'
});
var webpack = require('webpack');


module.exports = {
  devtool: 'source-map',
  entry: [
    '../server/App.js'
  ],

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader'}
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