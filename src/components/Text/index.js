import { Box } from '../../lib/core'
import { forwardProps } from '../../lib/utils'
import { baseProps } from '../../lib/config/props'

export default {
  name: 'Text',
  inject: ['$theme', '$colorMode'],
  props: {
    as: {
      type: [String, Array],
      default: 'p'
    },
    ...baseProps
  },
  render (h) {
    return h(Box, {
      props: {
        as: this.as,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}
