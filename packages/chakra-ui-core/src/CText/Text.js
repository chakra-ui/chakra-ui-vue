import CBox from '../Box'
import { forwardProps } from '../utils'
import { baseProps } from '../config/props'

export default {
  name: 'CText',
  inject: ['$theme', '$colorMode'],
  props: {
    as: {
      type: [String, Array],
      default: 'p'
    },
    ...baseProps
  },
  render (h) {
    return h(CBox, {
      props: {
        as: this.as,
        fontFamily: this.as === 'kbd' ? 'mono' : 'body',
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}
