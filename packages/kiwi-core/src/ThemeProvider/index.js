const ThemeProvider = {
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object,
      default: () => null
    },
    icons: {
      type: Object,
      required: false
    }
  },
  provide () {
    return {
      $theme: () => this.theme,
      $icons: this.icons
    }
  },
  render () {
    return this.$slots.default
  }
}

export default ThemeProvider
