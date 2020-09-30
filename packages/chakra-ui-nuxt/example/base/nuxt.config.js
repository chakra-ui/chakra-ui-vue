const { resolve } = require('path')
const theme = require('./utils/theme')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    { handler: require('../../lib/module') },
    { handler: require('@nuxtjs/emotion') }
  ],
  chakra: {
    config: {
      autoImport: false
    },
    extendTheme: theme
  }
}
