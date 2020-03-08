import Box from '../Box'
import { baseProps } from '../config/props'
import { forwardProps } from '../utils'

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
const Heading = {
  name: 'Heading',
  props: {
    size: {
      type: [String, Array, Object],
      default: 'xl'
    },
    as: {
      type: String,
      default: 'h1'
    },
    ...baseProps
  },
  render (h) {
    return h(Box, {
      props: {
        as: this.as,
        fontSize: sizes[this.size],
        lineHeight: 'shorter',
        fontWeight: 'bold',
        fontFamily: 'heading',
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

export default Heading
