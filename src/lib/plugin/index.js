import Theme from '../../../kiwi.config'

const Kiwi = {
  install (Vue, options = {}) {
    // Create Kiwi instance and initialize theme
    const KiwiTheme = {
      ...Theme,
      ...options.theme
    }

    Vue.prototype.$kiwi = {
      theme: KiwiTheme.palette
    }

    // Provide Theme via global mixin.
    Vue.mixin({
      provide: {
        KiwiTheme
      }
    })
  }
}

export default Kiwi
