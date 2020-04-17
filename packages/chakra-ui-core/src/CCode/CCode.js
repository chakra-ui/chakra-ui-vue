/**
 * Hey! Welcome to @chakra-ui/vue Code
 *
 * Code is a component used to display inline code.
 *
 * @see Docs     https://vue.chakra-ui.com/code
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCode/CCode.js
 */

import useBadgeStyle from '../CBadge/utils/badge.styles'
import { useVariantColorWarning, forwardProps } from '../utils'
import { baseProps } from '../config/props'

import CBox from '../CBox'

/**
 * CCode component
 *
 * Inline code component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/code
 */
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
      },
      attrs: {
        'data-chakra-component': 'CCode'
      }
    }, this.$slots.default)
  }
}

export default CCode
