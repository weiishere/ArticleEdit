const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appPath = path.resolve(__dirname, './');
const version = '20180321';
const serverHost = 'localhost';//'static.360buyimg.com';
const port = 8800;

const webpackConfig = {
  cache: true, //开启缓存,增量编译
  resolve: {
    //自动扩展文件后缀名
    extensions: ['.js', '.less', '.png', '.jpg', '.gif'],
    //模块别名定义，方便直接引用别名
    // alias: {
    //   'react-router-redux': path.resolve(nodeModules, 'react-router-redux-fixed/lib/index.js'),
    // }
  },
  //mode: 'development',
  entry: {
    app: path.resolve(appPath, 'client/src', 'index.js'),
    dll: ['antd', 'react', 'react-dom', 'react-router-dom']
  },
  output: {
    path: path.resolve(appPath, 'dist'),
    filename: '[name].bundle.js', //文件名称
    publicPath: `/dist/${version}/` //资源上下文路径
  },

  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader?cacheDirectory=true',
      exclude: /(node_modules|bower_components)/

    },
    {
      test: /\.(css|less)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer({
              browsers: ['last 5 versions']
            })]
          }
        }, {
          loader: 'less-loader', options: { javascriptEnabled: true }
        }]
      })
    },
    {
      test: /\.(ico|png|gif|jpg|jpeg)$/,
      loader: 'url-loader'
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      version: version,
      template: __dirname + '/client/index.ejs'
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new ExtractTextPlugin({
      filename: "css/app.min.css"
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'dll',
    //   filename: 'dll.js'
    // })
  ],
  devtool: '#source-map',//cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: serverHost,
    port: port,
    watchContentBase: true,
    watchOptions: {
      poll: 500
    }
  }
};
module.exports = webpackConfig;

