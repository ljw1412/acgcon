const { resolve } = require('path')
const HtmlWebpackTopBannerPlugin = require('./plugins/html-webpack-top-banner-plugin')

const config = {
  configureWebpack: {
    resolve: {
      alias: {
        '@a': resolve('src/views/Main/Animation'),
        '@c': resolve('src/views/Main/Comic'),
        '@g': resolve('src/views/Main/Game'),
        '@~': resolve('src/views/Main/_Common')
      }
    },
    plugins: [
      new HtmlWebpackTopBannerPlugin({
        banner: `Build Time: ${new Date()}`
      })
    ],
    externals: {
      moment: 'moment'
    }
  }
}

module.exports = config
