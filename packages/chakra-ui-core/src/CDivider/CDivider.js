/**
 * Hey! Welcome to @chakra-ui/vue Divider
 *
 * Dividers are used to display a thin horizontal or vertical line.
 *
 * @see Docs     https://vue.chakra-ui.com/divider
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CDivider/CDivider.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CDivider/accessibility.md
 */

import { createStyledAttrsMixin } from '../utils'

/**
 * CDivider component
 *
 * Creates a horizontal or vertical dividing rule between sibling
 * elements
 *
 * @see Docs https://vue.chakra-ui.com/divider
 */
const CDivider = {
  mixins: [createStyledAttrsMixin('CDivider')],
  props: {
    orientation: {
      type: String,
      default: 'horizontal'
    }
  },
  computed: {
    borderProps () {
      return this.orientation === 'vertical'
        ? { borderLeft: '0.0625rem solid', height: 'auto', mx: 2 }
        : { borderBottom: '0.0625rem solid', width: 'auto', my: 2 }
    },
    componentStyles () {
      return {
        border: 0,
        ...this.borderProps,
        opacity: 0.6,
        borderColor: 'inherit'
      }
    }
  },
  render (h) {
    return h('hr', {
      class: this.className,
      attrs: {
        'aria-orientation': this.orientation,
        ...this.computedAttrs
      }
    })
  }
}

export default CDivider
