import Theme from '../../../kiwi.config'
/**
 * Kiwi Plugin install.
 *  - Install programmatic components
 *  - Expose set theme method.
 */
const Kiwi = {
  install (Vue, options) {
    // Create Kiwi instance and expose theme
    const KiwiTheme = {
      ...Theme,
      ...options.theme
    }

    Vue.prototype.$kiwi = {
      theme: KiwiTheme.palette
    }

    Vue.mixin({
      provide: {
        KiwiTheme
      }
    })
  }
}

export default Kiwi
