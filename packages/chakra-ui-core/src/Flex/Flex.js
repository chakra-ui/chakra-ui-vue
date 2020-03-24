import Box from '../Box'
import { forwardProps } from '../utils'

/**
 * Flex is Box with display: flex and comes with helpful style shorthand. It renders a div element.
 */
const Flex = {
  name: 'Flex',
  extends: Box,
  props: {
    as: String,
    align: [String, Array],
    justify: [String, Array],
    wrap: [String, Array],
    direction: [String, Array],
    size: [String, Array]
  },
  render (h) {
    return h(Box, {
      props: {
        as: this.as,
        display: 'flex',
        flexDirection: this.direction,
        alignItems: this.align,
        justifyContent: this.justify,
        flexWrap: this.wrap,
        h: this.size,
        w: this.size,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

export default Flex
