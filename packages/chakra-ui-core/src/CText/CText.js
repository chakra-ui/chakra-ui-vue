import CBox from '../CBox'
import { forwardProps } from '../utils'
import { baseProps } from '../config/props'

export default {
  name: 'CText',
  inject: ['$chakraTheme', '$chakraColorMode'],
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
