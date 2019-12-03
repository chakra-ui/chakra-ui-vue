const ThemeProvider = {
  name: 'ThemeProvider',
  props: {
    theme: {
      type: Object,
      default: () => null
    },
    colorMode: {
      type: String,
      default: 'light'
    },
    icons: {
      type: Object,
      required: false
    }
  },
  provide () {
    return {
      $theme: () => this.theme,
      $colorMode: this.colorMode,
      $icons: this.icons
    }
  },
  render () {
    return this.$slots.default
  }
}

export default ThemeProvider
