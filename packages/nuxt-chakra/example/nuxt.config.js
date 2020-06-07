const { resolve } = require('path')
const theme = require('./utils/theme')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  modules: [
    { handler: require('../') },
    // During development comment please uncomment,
    process.env.NODE_ENV === 'development' && { handler: require('@nuxtjs/emotion') }
  ],
  build: {
    transpile: ['@nuxtjs/emotion']
  },
  chakra: {
    extendTheme: theme
  }
}
