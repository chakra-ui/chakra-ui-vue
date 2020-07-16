/**
 * Hey! Welcome to @chakra-ui/vue Box
 *
 * Box is the most abstract component on top of which all
 * other @chakra-ui/vue components are built. By default, it renders a `div` element
 *
 * @see Docs     https://vue.chakra-ui.com/box
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CBox/CBox.js
 */

import { createStyledAttrsMixin } from '../utils'

/**
 * CBox component
 *
 * Abstract component on top of which all other Chakra components are built.
 *
 * @see Docs https://vue.chakra-ui.com/box
 */
const CBox = {
  name: 'CBox',
  mixins: [createStyledAttrsMixin('CBox')],
  props: {
    as: {
      type: [String, Object],
      default: 'div'
    },
    to: {
      type: [String, Object],
      default: ''
    }
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

export default CBox
