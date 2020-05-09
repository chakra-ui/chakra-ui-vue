import { parsePackIcons } from '../utils/icons'
import internalIcons from '../lib/internal-icons'
import defaultTheme from '../../../chakra-ui-theme/src'
import VScrollLock from 'v-scroll-lock'
import { merge } from 'lodash-es'
import useToast from '../CToast'

/**
 * @typedef {Object} Theme Chakra UI Theme object
 * @property {Object} breakpoints
 * @property {Object} zIndices
 * @property {Object} radii
 * @property {Object} opacity
 * @property {Object} borders
 * @property {Object} colors
 * @property {Object} borderWidths
 * @property {Object} sizes
 * @property {Object} shadows
 * @property {Object} space
 * @property {Object} fontSizes
 * @property {Object} fonts
 * @property {Object} fontWeights
 * @property {Object} lineHeights
 * @property {Object} letterSpacings
 */

/**
 * @typedef {Object} Options
 * @property {Theme} theme
 * @property {Theme} extendTheme
 * @property {Object} icons
 * @property {Object} icons.extend
 * @property {Object} icons.iconPack
 * @property {Object} icons.iconSet
 *
 */

/**
 * Chakra-ui Component library plugin
 * @type {Chakra}
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

    if (options.icons && options.icons.iconPack) {
      packIcons = parsePackIcons(options.icons.iconPack, options.icons.iconSet)
    }

    const icons = {
      ...internalIcons,
      ...packIcons,
      ...extendedIcons
    }

    // Recursively merge extended theme variables
    const mergedTheme = merge(defaultTheme, options.extendTheme)

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
