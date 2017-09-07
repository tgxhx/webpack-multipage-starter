var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config/index')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client.js'].concat(baseWebpackConfig.entry[name])
})

var chunks = Object.keys(utils.getFiles('js'))
var devConf = merge(baseWebpackConfig, {
  module: {
    rules: [{
      test: /\.s?css$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new CommonsChunkPlugin({
      name: 'vendors',
      chunks: chunks,
      minChunks: chunks.length
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

var views = utils.getFiles('html')
views.forEach(function (path) {
  var filename = path.match(/\/(\w+)\.\w+/)[1]
  var htmlconf = {
    // title: filename,
    hash: true,
    cache: true,
    inject: true,
    chunks: ['vendors', filename],
    filename: filename + '.html',
    template: path
  }
  devConf.plugins.push(new HtmlWebpackPlugin(htmlconf))
})


module.exports = devConf
