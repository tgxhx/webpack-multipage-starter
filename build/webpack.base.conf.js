var path = require('path')
var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config/index')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

var entries = utils.getFiles('js')

var config = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  module: {
    rules: [{
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('images/[name].[hash:8].[ext]')
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
          }
        }]
      },
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('test')],
        use: 'babel-loader'
      },
      {
        test: /\.(html)$/,
        use: ['html-loader']
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test: /\.art$/,
        loader: "art-template-loader",
      }
    ]
  },
  resolve: {
    alias:{
      comp: resolve('src/components'),
      lib: resolve('src/js/lib'),
      img: resolve('src/images'),
      util: resolve('src/css/util/util.scss')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    })
  ]
}

module.exports = config
