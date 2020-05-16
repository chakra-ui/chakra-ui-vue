const { resolve } = require('path')

module.exports = function (moduleOptions) {
  /**
   * Merge defaults from Nuxt config
   */
  const options = Object.assign({}, this.options.chakra, moduleOptions)

  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'chakra.js',
    options
  })
}

module.exports.meta = require('../package.json')
