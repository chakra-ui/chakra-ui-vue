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

export default {
  name: 'CSSReset',
  inject: ['$theme', '$colorMode'],
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
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
