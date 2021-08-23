/**
 * Hey! Welcome to @chakra-ui/vue CThemeProvider
 *
 * The CThemeProvider componeent provides theme context to all it's
 * children.
 *
 * @see Docs     https://vue.chakra-ui.com/getting-started
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CThemeProvider/CThemeProvider.js
 */

import { injectGlobal } from '@emotion/css'
import { colorModeObserver } from '../utils/color-mode-observer'

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
      $chakraColorMode: () => 'light'
    }
  },
  props: {
    rootKey: {
      type: String,
      default: ':root'
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
        this.updateGlobalCssVars()
      }
    },
    icons: {
      immediate: true,
      handler (newVal) {
        colorModeObserver.icons = newVal
      }
    }
  },
  methods: {
    updateGlobalCssVars () {
      const rootKey = this.rootKey || ':root'
      injectGlobal({
        [rootKey]: this.theme.__cssVars
      })
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
