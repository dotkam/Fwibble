var HtmlWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/views/index.html',
  filename: 'index.html',
  inject: 'body'
});


module.exports = {
  entry: [
    './server/App.js'
  ],

  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader', 'react-hot'] },
      { test: /\.css$/, loader: "style-loader!css-loader"}
    ]
  },

  plugins: [HTMLWebpackPluginConfig]
};
