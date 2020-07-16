/**
 * Hey! Welcome to @chakra-ui/vue Code
 *
 * Code is a component used to display inline code.
 *
 * @see Docs     https://vue.chakra-ui.com/code
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCode/CCode.js
 */

import useBadgeStyle from '../CBadge/utils/badge.styles'
import { useVariantColorWarning, createStyledAttrsMixin } from '../utils'

import { SNA } from '../config/props/props.types'

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
  mixins: [createStyledAttrsMixin('CCode')],
  props: {
    variantColor: {
      type: String,
      default: 'gray'
    },
    fontFamily: {
      type: SNA,
      default: 'mono'
    }
  },
  computed: {
    badgeStyle () {
      useVariantColorWarning(this.theme, 'CCode', this.variantColor)
      return useBadgeStyle({
        variant: 'subtle',
        color: this.variantColor,
        colorMode: this.colorMode,
        theme: this.theme
      })
    },
    componentStyles () {
      return {
        display: 'inline-block',
        fontSize: 'sm',
        px: '0.2em',
        fontFamily: 'mono',
        rounded: 'sm',
        ...this.badgeStyle
      }
    }
  },
  render (h) {
    return h('code', {
      class: this.className,
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

export default CCode
