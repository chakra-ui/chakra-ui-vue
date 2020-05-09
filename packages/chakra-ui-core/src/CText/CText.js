import CBox from '../CBox'
import { forwardProps } from '../utils'
import { baseProps } from '../config/props'
import { useTruncated } from './utils/text.utils'

export default {
  name: 'CText',
  inject: ['$chakraTheme', '$chakraColorMode'],
  props: {
    ...baseProps,
    as: {
      type: [String, Array],
      default: 'p'
    },
    isTruncated: Boolean,
    fontFamily: {
      type: [String, Array],
      default: 'body'
    }
  },
  render (h) {
    return h(CBox, {
      props: {
        as: this.as,
        ...forwardProps(this.$props),
        fontFamily: this.as === 'kbd' ? 'mono' : this.fontFamily,
        ...this.isTruncated && useTruncated()
      }
    }, this.$slots.default)
  }
}
