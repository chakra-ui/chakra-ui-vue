/**
 * Hey! Welcome to @chakra-ui/vue Text
 *
 * Text is the used to render text and paragraphs within an interface. It renders a <p> tag by default.
 *
 * @see Docs     https://vue.chakra-ui.com/text
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CText/CText.js
 */

import { createStyledAttrsMixin } from '../utils'
import { useTruncated } from './utils/text.utils'

/**
 * CText component
 *
 * the text element component
 *
 * @see Docs https://vue.chakra-ui.com/text
 */
const CText = {
  mixins: [createStyledAttrsMixin('CText')],
  props: {
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
  computed: {
    componentStyles () {
      return {
        fontFamily: this.as === 'kbd' ? 'mono' : this.fontFamily,
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

export default CText
