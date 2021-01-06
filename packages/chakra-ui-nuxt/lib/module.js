const { resolve } = require('path')
const defu = require('defu')
const { defaultTheme, parsePackIcons, internalIcons, createServerDirective } = require('@chakra-ui/vue')
const { ChakraLoaderPlugin } = require('chakra-loader')

module.exports = function (moduleOptions) {
  const { nuxt } = this

  const options = {
    config: {
      autoImport: true
    },
    ...this.options.chakra,
    ...moduleOptions
  }

  // Recursively merge extended theme variables
  const theme = defu(options.extendTheme, defaultTheme)

  // Resolve icons
  let packIcons = {}
  if (options.icons && options.icons.iconPack) {
    packIcons = parsePackIcons(options.icons.iconSet)
  }

  // Transpile lodash-es
  nuxt.options.build.transpile.push('lodash-es')

  // Transpile @chakra-ui.
  nuxt.options.build.transpile.push('@chakra-ui')

  if (nuxt.options.render.bundleRenderer.directives) {
    nuxt.options.render.bundleRenderer.directives.chakra = createServerDirective(theme)
  } else {
    nuxt.options.render.bundleRenderer.directives = {
      chakra: createServerDirective(theme)
    }
  }

  // Icons
  const icons = {
    ...internalIcons,
    ...packIcons,
    ...(options.icons && options.icons.extend)
  }

  // Auto-import components
  if (options.config.autoImport) {
    this.extendBuild((config) => {
      config.plugins.push(
        new ChakraLoaderPlugin()
      )
    })
  }

  // Global bindings and plugins
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'chakra.js',
    options: {
      theme,
      icons
    }
  })
}

module.exports.meta = require('../package.json')
