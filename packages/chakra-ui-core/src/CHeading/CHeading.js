import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

import CBox from '../CBox'

const sizes = {
  '2xl': ['4xl', null, '5xl'],
  xl: ['3xl', null, '4xl'],
  lg: ['xl', null, '2xl'],
  md: 'xl',
  sm: 'md',
  xs: 'sm'
}

/**
 * Heading component gives text elements for titles and subtitles
 */
const CHeading = {
  name: 'CHeading',
  props: {
    size: {
      type: [String, Array, Object],
      default: 'xl'
    },
    as: {
      type: String,
      default: 'h2'
    },
    ...baseProps,
    isTruncated: Boolean
  },
  render (h) {
    return h(CBox, {
      props: {
        as: this.as,
        fontSize: sizes[this.size],
        lineHeight: 'shorter',
        fontWeight: 'bold',
        fontFamily: 'heading',
        ...forwardProps(this.$props),
        ...this.isTruncated && {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }
      }
    }, this.$slots.default)
  }
}

export default CHeading
