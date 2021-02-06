import VScrollLock from 'v-scroll-lock'
import { merge } from 'lodash-es'
import { parsePackIcons } from '../utils/icons'
import internalIcons from '../lib/internal-icons'
import { createClientDirective } from '../directives'
import defaultTheme from '../../../chakra-ui-theme/src'
import useToast from '../CToast'

/**
 * Chakra-ui Component library plugin
 * @type {import("../../types").default}
 */
const Chakra = {
  /**
   *
   * @param {Vue} Vue
   * @param {Options} options
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
    const mergedTheme = merge(defaultTheme, options.extendTheme)

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
  }
}

export default Chakra
