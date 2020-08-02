const { resolve } = require('path')
const defu = require('defu')
const { defaultTheme } = require('@chakra-ui/vue')
const { parsePackIcons } = require('@chakra-ui/vue/src/utils/icons')
const internalIcons = require('@chakra-ui/vue/src/lib/internal-icons')
const { createServerDirective } = require('@chakra-ui/vue/src/directives/chakra.directive')

module.exports = function (moduleOptions) {
  const { nuxt } = this

  const options = {
    ...this.options.chakra,
    ...moduleOptions
  }

  // Recursively merge extended theme variables
  const theme = defu(options.extendTheme, defaultTheme)

  // Resolve icons
  let packIcons = {}
  if (options.icons && options.icons.iconPack) {
    packIcons = parsePackIcons(options.icons.iconPack, options.icons.iconSet)
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
    ...internalIcons.default,
    ...packIcons,
    ...(options.icons && options.icons.extend)
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
