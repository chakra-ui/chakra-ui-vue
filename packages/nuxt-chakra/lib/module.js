import { resolve } from 'path'
import defu from 'defu'
import defaultTheme from '@chakra-ui/theme-vue/src'
import { parsePackIcons } from '@chakra-ui/vue/src/utils/icons'
import internalIcons from '@chakra-ui/vue/src/lib/internal-icons'
import { kebabCase } from 'lodash-es'

export default function (moduleOptions) {
  const { nuxt } = this
  const options = { ...this.options.chakra, ...moduleOptions }

  // Workaround to ensure user components/ dir is not scanned unwillingly
  if (!nuxt.options.components) {
    nuxt.options.components = { dirs: [] }
  }

  // Ensure components module is enabled
  this.requireModule('@nuxt/components')
  // Add @nuxtjs/emotion module
  this.requireModule('@nuxtjs/emotion')

  // Transpile lodash-es
  nuxt.options.build.transpile.push('lodash-es')

  // Transpile @chakra-ui
  nuxt.options.build.transpile.push('@chakra-ui')

  // Recursively merge extended theme variables
  const theme = defu(defaultTheme, options.extendTheme)

  // Resolve icons
  let packIcons = {}
  if (options.icons && options.icons.iconPack) {
    packIcons = parsePackIcons(options.icons.iconPack, options.icons.iconSet)
  }
  const icons = {
    ...internalIcons,
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

  // Provide components on demand
  nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: '@chakra-ui/vue/src',
      ignore: [
        '!**/C*.js',
        '**/*.stories.js'
      ]
    })
  })

  // Workaround: Extend components with multi export
  nuxt.hook('components:extend', (components) => {
    const compoundExports = {
      CAccordion: ['CAccordion', 'CAccordionItem', 'CAccordionHeader', 'CAccordionPanel', 'CAccordionIcon'],
      CModal: ['CModal', 'CModalOverlay', 'CModalContent', 'CModalHeader', 'CModalFooter', 'CModalBody', 'CModalCloseButton'],
      CAlert: ['CAlert', 'CAlertIcon', 'CAlertTitle', 'CAlertDescription']
    }

    Object.keys(compoundExports).forEach((comp) => {
      const [component] = components.splice(components.findIndex(c => c.pascalName === comp), 1)
      for (const exp of compoundExports[comp]) {
        components.push({
          ...component,
          pascalName: exp,
          kebabName: kebabCase(exp),
          import: component.import.replace('default', exp)
        })
      }
    })
  })
}
