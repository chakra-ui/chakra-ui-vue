import { colorModeObserver } from '../utils/color-mode-observer'

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
  watch: {
    theme: {
      immediate: true,
      handler (newVal) {
        colorModeObserver.theme = newVal
      }
    },
    icons: {
      immediate: true,
      handler (newVal) {
        colorModeObserver.icons = newVal
      }
    }
  },
  render () {
    return this.$slots.default
  }
}

export default ThemeProvider
