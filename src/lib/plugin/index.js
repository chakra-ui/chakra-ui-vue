import Theme from '../../../kiwi.config'

const Kiwi = {
  install (Vue, options = {}) {
    // Create Kiwi instance and initialize theme
    const theme = {
      ...Theme,
      ...options.theme
    }

    Vue.prototype.$kiwi = {
      theme
    }

    // TODO:
    // - Make theme observable and use styled components to set theme dynamically

    // Provide Theme via global mixin.
    // Vue.mixin({
    //   provide: {
    //     theme,
    //     colorMode: 'light'
    //   }
    // })
  }
}

export default Kiwi
