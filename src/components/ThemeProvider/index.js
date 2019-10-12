import Theme from '../../../kiwi.config'

/**
 * @type {Object}
 */
const ThemeProvider = {
  name: 'ThemeProvider',
  provide: {
    KiwiTheme: Theme
  },
  render (h) {
    return this.$slots.default[0]
  }
}

export default ThemeProvider
