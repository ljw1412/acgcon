/* eslint-disable @typescript-eslint/no-var-requires */
const { relative, join } = require('path')
const HtmlWebpackTopBannerPlugin = require('html-webpack-top-banner-plugin')

module.exports = {
  configureWebpack: {
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
        prependData: ({ resourcePath, rootContext }) => {
          const relativePath = relative(rootContext, resourcePath)
          return !relativePath.startsWith(join('src', 'styles'))
            ? "@import '@/styles/scss/index.scss';"
            : ''
        }
      }
    }
  }
}
