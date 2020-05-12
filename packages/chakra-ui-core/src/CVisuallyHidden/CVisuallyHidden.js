/**
 * Hey! Welcome to @chakra-ui/vue VisuallyHidden
 *
 * This component is used to visually hide elements that have custom
 * appearance. For example, see the CControlBox.
 *
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CVisuallyHidden/CVisuallyHidden.js
 */

import { css } from 'emotion'
import CBox from '../CBox'

/**
 * CVisuallyHidden component
 *
 * the visually hidden wrapper element
 */
const CVisuallyHidden = {
  name: 'CVisuallyHidden',
  props: {
    as: {
      type: String,
      default: 'div'
    },
    w: [String, Number],
    h: [String, Number],
    pos: String
  },
  computed: {
    className () {
      return css({
        border: '0px',
        clip: 'rect(0px, 0px, 0px, 0px)',
        height: `${this.w || '1px'}`,
        width: `${this.h || '1px'}`,
        margin: '-1px',
        padding: '0px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: `${this.pos || 'absolute'}`
      })
    }
  },
  render (h) {
    return h(CBox, {
      class: [this.className],
      props: {
        as: this.as
      },
      attrs: {
        'data-chakra-component': 'CVisuallyHidden',
        ...this.$attrs
      }
    }, this.$slots.default)
  }
}

export default CVisuallyHidden
