import VScrollLock from 'v-scroll-lock'
import { merge } from 'lodash-es'
import { toCSSVar } from '@chakra-ui/styled-system'
import defaultTheme from '@chakra-ui/theme-vue'

import { parsePackIcons } from '../utils/icons'
import internalIcons from '../lib/internal-icons'
import { createClientDirective } from '../directives'
import useToast from '../CToast'
import { colorModeObserver, mode } from '../utils'

/**
 * Chakra-ui Component library plugin
 * @type {import("../../types").ChakraPlugin}
 */
const Chakra = {
  /**
   *
   * @param {Vue} Vue
   * @param {import("../../types").Options} options
   */
  install (Vue, options = {}) {
    let packIcons = {}
    const extendedIcons = options.icons ? options.icons.extend || {} : {}

    if (options.icons) {
      packIcons = parsePackIcons(options.icons.iconSet)
    }

    const icons = {
      ...internalIcons,
      ...packIcons,
      ...extendedIcons
    }

    // Recursively merge extended theme variables
    const mergedTheme = toCSSVar(merge(defaultTheme, options.extendTheme))

    Vue.directive('chakra', createClientDirective(mergedTheme))

    // Bind theme and icons to prototype
    Vue.prototype.$chakra = {
      theme: mergedTheme,
      icons
    }

    const toast = useToast()
    Vue.prototype.$toast = toast

    /** Install dependent plugins */
    Vue.use(VScrollLock)

    Vue.mixin({
      computed: {
        chakraColorMode () {
          return colorModeObserver.colorMode
        },
        chakraTheme () {
          return colorModeObserver.theme
        },
        chakraToggleColorMode () {
          return colorModeObserver.toggleColorMode
        },
        $mode: vm => (lightValue, darkValue) => mode(lightValue, darkValue, colorModeObserver)
      }
    })
  }
}

export default Chakra
export { mode } from '../utils/color-mode-observer'
