import Box from '../Box'
import useBadgeStyle from '../Badge/badge.styles'
import { useVariantColorWarning, forwardProps } from '../utils'

const Code = {
  name: 'Code',
  inject: ['$theme', '$colorMode'],
  extends: Box,
  props: {
    variantColor: {
      type: String,
      default: 'gray'
    }
  },
  computed: {
    theme () {
      return this.$theme()
    },
    colorMode () {
      return this.$colorMode()
    },
    badgeStyle () {
      useVariantColorWarning(this.theme, 'Code', this.variantColor)
      return useBadgeStyle({
        variant: 'subtle',
        color: this.variantColor,
        colorMode: this.colorMode,
        theme: this.theme
      })
    }
  },
  render (h) {
    return h(Box, {
      props: {
        display: 'inline-block',
        fontFamily: 'mono',
        fontSize: 'sm',
        px: '0.2em',
        rounded: 'sm',
        ...this.badgeStyle,
        ...forwardProps(this.$props),
        as: 'code'
      }
    }, this.$slots.default)
  }
}

export default Code
