const { resolve } = require('path')

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
    externals: {
      moment: 'moment'
    }
  }
}

module.exports = config
