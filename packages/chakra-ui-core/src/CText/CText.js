/**
 * Hey! Welcome to @chakra-ui/vue Text
 *
 * Text is the used to render text and paragraphs within an interface. It renders a <p> tag by default.
 *
 * @see Docs     https://vue.chakra-ui.com/text
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CText/CText.js
 */

import CBox from '../CBox'
import { forwardProps } from '../utils'
import { baseProps } from '../config/props'
import { useTruncated } from './utils/text.utils'

/**
 * CText component
 *
 * the text element component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/text
 */
const CText = {
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
      },
      attrs: {
        'data-chakra-component': 'CText'
      }
    }, this.$slots.default)
  }
}

export default CText
