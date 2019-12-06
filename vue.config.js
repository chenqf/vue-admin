const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
        '@api': path.resolve(__dirname, 'src/api/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@libs': path.resolve(__dirname, 'src/libs/'),
        '@http': path.resolve(__dirname, 'src/libs/http/'),
        '@api.request': path.resolve(__dirname, 'src/libs/http/api.request.js'),
      }
    }
  }
}
