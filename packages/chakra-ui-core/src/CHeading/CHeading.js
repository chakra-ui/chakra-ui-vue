/**
 * Hey! Welcome to @chakra-ui/vue Heading
 *
 * Headings are used for rendering headlines.
 *
 * Heading composes CBox so you can use all the style props
 * and add responsive styles as well. It renders an <h2> tag by default.
 *
 * @see Docs     https://vue.chakra-ui.com/heading
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CHeading/CHeading.js
 */

import { baseProps } from '../config/props'
import { forwardProps } from '../utils'
import { useTruncated } from '../CText/utils/text.utils'

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
 * CHeading component
 *
 * The CHeading is used for rendering headlines.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/heading
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
        ...this.isTruncated && useTruncated()
      },
      attrs: {
        'data-chakra-component': 'CHeading'
      }
    }, this.$slots.default)
  }
}

export default CHeading
