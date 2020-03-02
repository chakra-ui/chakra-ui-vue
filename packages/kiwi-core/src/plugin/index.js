import { parsePackIcons } from '../utils/icons'
import internalIcons from '../lib/internal-icons'
import VScrollLock from 'v-scroll-lock'
import useToast from '../Toast'

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

    const toast = useToast()
    Vue.prototype.$toast = toast

    /** Install dependant plugins */
    Vue.use(VScrollLock)
  }
}

export default Kiwi
