/**
 * Hey! Welcome to @chakra-ui/vue Badge
 *
 * The Badge component is used to highlight an item's status for quick recognition.
 *
 * @see Docs     https://vue.chakra-ui.com/badge
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CBadge/CBadge.js
 */

import { createStyledAttrsMixin } from '../utils'
import useBadgeStyles from './utils/badge.styles'

/**
 * CBadge component
 *
 * Used to highlight an item's status for quick recognition.
 *
 * @see Docs https://vue.chakra-ui.com/badge
 */
const CBadge = {
  name: 'CBadge',
  mixins: [createStyledAttrsMixin('CBadge')],
  props: {
    variant: {
      type: String,
      default: 'subtle'
    },
    variantColor: {
      type: String,
      default: 'gray'
    },
    as: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    badgeStyles () {
      return useBadgeStyles({
        theme: this.theme,
        colorMode: this.colorMode,
        color: this.variantColor,
        variant: this.variant
      })
    },
    componentStyles () {
      return {
        d: 'inline-block',
        textTransform: 'uppercase',
        fontSize: 'xs',
        fontFamily: 'body',
        px: 1,
        rounded: 'sm',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        ...this.badgeStyles
      }
    }
  },
  render (h) {
    return h(this.as, {
      class: this.className,
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

export default CBadge
