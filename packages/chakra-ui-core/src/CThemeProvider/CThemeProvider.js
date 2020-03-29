import { colorModeObserver } from '../utils/color-mode-observer'

const CThemeProvider = {
  name: 'CThemeProvider',
  provide () {
    return {
      $chakraTheme: () => this.theme,
      $chakraIcons: this.icons,
      /**
       * By default the ThemeProvider exposes a colorMode value of light
       * If no `ColorModeProvider` is provided in children/ consumer app, all chakra
       * components will consume the $chakraColorMode from here.
       */
      $chakraColorMode: () => 'light'
    }
  },
  computed: {
    icons () {
      return this.$chakra ? this.$chakra.icons : {}
    },
    theme () {
      return this.$chakra.theme
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
  render (h) {
    return h('div', {
      attrs: {
        id: '__chakra-app'
      }
    }, this.$slots.default)
  }
}

export default CThemeProvider
