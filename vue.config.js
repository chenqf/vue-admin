const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
        '@view': path.resolve(__dirname, 'src/view'),
        '@config': path.resolve(__dirname, 'config.js'),
        '@api': path.resolve(__dirname, 'src/api/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@libs': path.resolve(__dirname, 'src/libs/'),
        '@router': path.resolve(__dirname, 'src/router/'),
        '@http': path.resolve(__dirname, 'src/libs/http/'),
        '@api.request': path.resolve(__dirname, 'src/libs/http/api.request.js'),
      }
    } 
  }
}
