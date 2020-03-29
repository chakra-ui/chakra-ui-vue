import useBadgeStyle from '../CBadge/utils/badge.styles'
import { useVariantColorWarning, forwardProps } from '../utils'
import { baseProps } from '../config/props'

import CBox from '../CBox'

const CCode = {
  name: 'CCode',
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    variantColor: {
      type: String,
      default: 'gray'
    },
    ...baseProps
  },
  computed: {
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
    },
    badgeStyle () {
      useVariantColorWarning(this.theme, 'CCode', this.variantColor)
      return useBadgeStyle({
        variant: 'subtle',
        color: this.variantColor,
        colorMode: this.colorMode,
        theme: this.theme
      })
    }
  },
  render (h) {
    return h(CBox, {
      props: {
        as: 'code',
        display: 'inline-block',
        fontFamily: 'mono',
        fontSize: 'sm',
        px: '0.2em',
        rounded: 'sm',
        ...this.badgeStyle,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

export default CCode
