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

import { createStyledAttrsMixin } from '../utils'
import { useTruncated } from '../CText/utils/text.utils'

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
  mixins: [createStyledAttrsMixin('CHeading')],
  props: {
    size: {
      type: [String, Array, Object],
      default: 'xl'
    },
    as: {
      type: String,
      default: 'h2'
    },
    isTruncated: Boolean
  },
  computed: {
    componentStyles () {
      return {
        fontSize: sizes[this.size],
        lineHeight: 'shorter',
        fontWeight: 'bold',
        fontFamily: 'heading',
        ...this.isTruncated && useTruncated()
      }
    }
  },
  render (h) {
    return h(this.as, {
      class: this.className,
      attrs: this.computedAttrs
    }, this.$slots.default)
  }
}

export default CHeading
