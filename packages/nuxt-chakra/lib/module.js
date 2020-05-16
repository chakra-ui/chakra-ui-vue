const { resolve } = require('path')

module.exports = function (moduleOptions) {
  /**
   * Add plugin for chakra-ui
   */
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'chakra.js',
    options: moduleOptions
  })
}

module.exports.meta = require('../package.json')
