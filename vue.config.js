const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '_c': path.resolve(__dirname, 'src/components/'),
        '@api.request': path.resolve(__dirname, 'src/libs/http/api.request.js'),
      }
    } 
  }
}
