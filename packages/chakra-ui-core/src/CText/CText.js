import CBox from '../CBox'
import { forwardProps } from '../utils'
import { baseProps } from '../config/props'
import { useTruncated } from './utils/test.utils'

export default {
  name: 'CText',
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    ...baseProps,
    as: {
      type: [String, Array],
      default: 'p'
    },
    isTruncated: Boolean
  },
  render (h) {
    return h(CBox, {
      props: {
        as: this.as,
        fontFamily: this.as === 'kbd' ? 'mono' : 'body',
        ...forwardProps(this.$props),
        ...this.isTruncated && useTruncated()
      }
    }, this.$slots.default)
  }
}
