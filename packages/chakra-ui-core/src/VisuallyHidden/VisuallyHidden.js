import { css } from 'emotion'
import Box from '../Box'

const VisuallyHidden = {
  name: 'VisuallyHidden',
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
    return h(Box, {
      class: [this.className],
      props: {
        as: this.as
      },
      attrs: this.$attrs
    }, this.$slots.default)
  }
}

export default VisuallyHidden
