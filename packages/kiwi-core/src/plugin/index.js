import { parsePackIcons } from '../utils/icons'
import internalIcons from '../lib/internal-icons'
import VueCompositionApi from '@vue/composition-api'

/**
 * Kiwi Component library plugin
 */
const Kiwi = {
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

    // Bind theme and icons to prototype
    Vue.prototype.$kiwi = {
      theme: options.theme,
      icons
    }

    /** Install dependant plugins */
    Vue.use(VueCompositionApi)
  }
}

export default Kiwi
