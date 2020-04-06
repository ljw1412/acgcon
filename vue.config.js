const { resolve } = require('path')
const HtmlWebpackTopBannerPlugin = require('html-webpack-top-banner-plugin')

const config = {
  configureWebpack: {
    resolve: {
      alias: {
        '@a': resolve('src/views/Main/Animation'),
        '@c': resolve('src/views/Main/Comic'),
        '@g': resolve('src/views/Main/Game'),
        '@~': resolve('src/views/Main/_Common'),
        '@admin': resolve('src/views/Admin')
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
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import '@/styles/index.scss';`
      }
    }
  }
}

module.exports = config
