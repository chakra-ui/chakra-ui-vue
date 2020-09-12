/**
 * Hey! Welcome to @chakra-ui/vue CThemeProvider
 *
 * The CThemeProvider componeent provides theme context to all it's
 * children.
 *
 * @see Docs     https://vue.chakra-ui.com/textarea
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CThemeProvider/CThemeProvider.js
 */

import { colorModeObserver } from '../utils/color-mode-observer'
import { systemProps } from '../utils'

/**
 * CThemeProvider component
 */
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
      $chakraColorMode: () => 'light',

      $chakraSystem: props => systemProps({ ...props, theme: this.theme })
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
        id: '__chakra-app',
        'data-chakra-component': 'CThemeProvider'
      }
    }, this.$slots.default)
  }
}

export default CThemeProvider
