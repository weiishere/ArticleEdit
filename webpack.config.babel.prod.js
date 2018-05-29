const webpack = require('webpack')
const merge = require('webpack-merge')

const config = require("./webpack.config.babel.js")

module.exports = merge(config, {
  plugins: [
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
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: process.env.NODE_ENV === 'production'
    // })
  ]
})


