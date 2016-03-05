var HmtlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HmtlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
});


module.exports = {
  entry: [
    './server/_index.js'
  ],

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}//?presets[]=es2015&presets[]=react' }
    ]
  },

  plugins: [HTMLWebpackPluginConfig]
};
