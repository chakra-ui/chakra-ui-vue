/**
 * Hey! Welcome to @chakra-ui/vue CReset
 *
 * CReset component injects global styles.
 *
 * @see Docs     https://vue.chakra-ui.com/radio
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CReset/CReset.js
 */

import { injectGlobal } from 'emotion'
import { useTailwindPreflight } from './preflight'

const defaultConfig = theme => ({
  light: {
    color: theme.colors.gray[800],
    bg: undefined,
    borderColor: theme.colors.gray[200],
    placeholderColor: theme.colors.gray[400]
  },
  dark: {
    color: theme.colors.whiteAlpha[900],
    bg: theme.colors.gray[800],
    borderColor: theme.colors.whiteAlpha[300],
    placeholderColor: theme.colors.whiteAlpha[400]
  }
})

/**
 * CReset component
 *
 * The CSS Reset component to reset browser styles
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/getting-started
 */
const CReset = {
  name: 'CReset',
  inject: ['$chakraTheme', '$chakraColorMode'],
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    styleConfig () {
      const _defaultConfig = defaultConfig(this.theme)
      return this.config
        ? this.config(this.theme, _defaultConfig)
        : defaultConfig(this.theme)
    }
  },
  props: {
    config: Object
  },
  created () {
    const { color, bg, borderColor, placeholderColor } = this.styleConfig[this.colorMode]
    useTailwindPreflight(this.theme)
    injectGlobal({
      'html': {
        lineHeight: 1.5,
        color: color,
        backgroundColor: bg
      },

      '*, *::before, *::after': {
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: borderColor
      },

      'input:-ms-input-placeholder, textarea:-ms-input-placeholder': {
        color: placeholderColor
      },

      'input::-ms-input-placeholder, textarea::-ms-input-placeholder': {
        color: placeholderColor
      },

      'input::placeholder, textarea::placeholder': {
        color: placeholderColor
      }
    })
  },
  render () {
    return null
  }
}

export default CReset
