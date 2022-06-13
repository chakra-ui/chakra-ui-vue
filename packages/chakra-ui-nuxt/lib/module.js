const { resolve } = require('path')
const { defu } = require('defu')
const { parsePackIcons, internalIcons, createServerDirective } = require('@chakra-ui/vue')
const defaultTheme = require('@chakra-ui/theme-vue')
const { ChakraLoaderPlugin } = require('chakra-loader')
const { toCSSVar } = require('@chakra-ui/styled-system')

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
  const mergedTheme = toCSSVar(defu(options.extendTheme, defaultTheme.default))

  // Resolve icons
  let packIcons = {}
  if (options.icons) {
    packIcons = parsePackIcons(options.icons.iconSet)
  }

  // Transpile lodash-es
  nuxt.options.build.transpile.push('lodash-es')

  // Transpile @chakra-ui.
  nuxt.options.build.transpile.push('@chakra-ui')

  if (nuxt.options.render.bundleRenderer.directives) {
    nuxt.options.render.bundleRenderer.directives.chakra = createServerDirective(mergedTheme)
  } else {
    nuxt.options.render.bundleRenderer.directives = {
      chakra: createServerDirective(mergedTheme)
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
      theme: mergedTheme,
      icons,
      extendTheme: options.extendTheme
    }
  })
}

module.exports.meta = require('../package.json')
