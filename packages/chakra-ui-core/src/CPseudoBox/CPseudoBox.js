/**
 * Hey! Welcome to @chakra-ui/vue PseudoBox
 *
 * The PseudoBox component
 *
 * @see Docs     https://vue.chakra-ui.com/pseudobox
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CPseudoBox/CPseudoBox.js
 */

import { createStyledAttrsMixin } from '../utils'

/**
 * CPseudoBox component
 *
 * The pseudobox component that accepts pseudo props
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/pseudobox
 */
const CPseudoBox = {
  name: 'CPseudoBox',
  mixins: [createStyledAttrsMixin('CPseudoBox', true)],
  props: {
    as: {
      type: [String, Object],
      default: () => 'div'
    },
    to: [String, Object]
  },
  render (h) {
    return h(this.as, {
      props: {
        to: this.to
      },
      class: this.className,
      on: this.listeners$,
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

export default CPseudoBox
