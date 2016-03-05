var HmtlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HmtlWebpackPlugin({
  template: __dirname + '/client/app/index.html',
  filename: 'index.html',
  inject: 'body'
});


module.exports = {
  entry: [
    './server/_index.js'
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  },

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  plugins: [HTMLWebpackPluginConfig]
};
