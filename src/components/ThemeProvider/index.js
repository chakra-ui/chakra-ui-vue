import Theme from '../../../kiwi.config'

/**
 * @type {Object}
 */
const ThemeProvider = {
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object,
      default: () => ({})
    }
  },
  provide: {
    KiwiTheme: Theme
  },
  render (h) {
    return this.$slots.default[0]
  }
}

export default ThemeProvider
