const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const merge = require('webpack-merge');
const extend = require('extend');
const config = require("./webpack.config.babel.js")
const version = 'v1';

module.exports = extend(config, {
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      version: version,
      template: __dirname + '/client/index.ejs'
    }),
    new ExtractTextPlugin({
      filename: "css/app.min.css"
    }),
    new webpack.DefinePlugin({
      compress: {
        warnings: false
      },
      comments: false,
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
})


