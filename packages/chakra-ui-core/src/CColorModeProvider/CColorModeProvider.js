/**
 * Hey! Welcome to @chakra-ui/vue ColorModePovider
 *
 * The `CColorModeProvider` component provides the current color mode value ("light" or "dark")
 * to all it's descendants. This variable can be injected as `$chakraColorMode`.
 * `$chakraColorMode` is a function that returns the current color mode value.
 *
 * The `CColorModeProvider` component also provides a function `$toggleColorMode` to switch
 * the `$chakraColorMode` between light and dark values at runtime.
 *
 * This file also exports the `CDarkMode` and `CLightMode` components that respectively
 * provide the "dark" and "light" color modes to their respective children.
 *
 * @see Example  https://chakra-ui-vue.netlify.com/?path=/story/ui-popover--hover-trigger
 * @see Docs     https://vue.chakra-ui.com/color-mode
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CColorModePovider/CColorModePovider.js
 */

import { colorModeObserver } from '../utils/color-mode-observer'

/**
 * CColorModeProvider component
 *
 * The ColorModeProvider component provides the current color mode value
 *
 * @see Docs https://vue.chakra-ui.com/color-mode
 */
const CColorModeProvider = {
  name: 'CColorModeProvider',
  props: {
    value: String
  },
  data () {
    return {
      colorMode: 'light'
    }
  },
  provide () {
    return {
      $chakraColorMode: () => this._colorMode,
      $toggleColorMode: this.toggleColorMode
    }
  },
  computed: {
    _colorMode: {
      get () {
        return this.value ? this.value : this.colorMode
      },
      set (value) {
        this.colorMode = value
      }
    }
  },
  watch: {
    _colorMode: {
      immediate: true,
      handler (newVal) {
        colorModeObserver.colorMode = newVal
      }
    }
  },
  methods: {
    toggleColorMode () {
      this._colorMode = this._colorMode === 'light' ? 'dark' : 'light'
    }
  },
  render () {
    return this.$scopedSlots.default({
      colorMode: this._colorMode,
      toggleColorMode: this.toggleColorMode
    })
  }
}

/**
 * CDarkMode component
 *
 * Provides `$chakraColorMode` of value "light" to its descendants
 *
 * @see Docs https://vue.chakra-ui.com/color-mode
 */
const CDarkMode = {
  name: 'CDarkMode',
  render (h) {
    return h(CColorModeProvider, {
      props: {
        value: 'dark'
      }
    }, this.$slots.default)
  }
}

/**
 * CLightMode component
 *
 * Provides `$chakraColorMode` of value "light" to its descendants
 *
 * @see Docs https://vue.chakra-ui.com/color-mode
 */
const CLightMode = {
  name: 'CLightMode',
  render (h) {
    return h(CColorModeProvider, {
      props: {
        value: 'light'
      }
    }, this.$slots.default)
  }
}

export default CColorModeProvider

export {
  CDarkMode,
  CLightMode
}
