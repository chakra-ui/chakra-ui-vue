import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

import CBox from '../Box'

/**
 * Flex is Box with display: flex and comes with helpful style shorthand. It renders a div element.
 */
const CFlex = {
  name: 'CFlex',
  props: {
    as: String,
    align: [String, Array],
    justify: [String, Array],
    wrap: [String, Array],
    direction: [String, Array],
    size: [String, Array],
    ...baseProps
  },
  render (h) {
    return h(CBox, {
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

export default CFlex
