/**
 * Hey! Welcome to @chakra-ui/vue Textarea
 *
 * The Textarea component allows you to easily
 * create multi-line text inputs.
 *
 * @see Docs     https://vue.chakra-ui.com/textarea
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CTextarea/CTextarea.js
 */

import styleProps from '../config/props'
import { inputProps } from '../CInput/utils/input.props'
import { forwardProps } from '../utils'

import CInput from '../CInput'
import { SNA } from '../config/props/props.types'

/**
 * CTextarea component
 *
 * the textarea element component
 *
 * @extends CInput
 * @see Docs https://vue.chakra-ui.com/textarea
 */
const CTextarea = {
  name: 'CTextarea',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    ...styleProps,
    ...inputProps,
    inputValue: String,
    py: {
      type: SNA,
      default: '8px'
    },
    minHeight: {
      type: SNA,
      default: '80px'
    },
    fontFamily: {
      type: SNA,
      default: 'body'
    },
    lineHeight: {
      type: SNA,
      default: 'shorter'
    }
  },
  render (h) {
    return h(CInput, {
      props: {
        ...forwardProps(this.$props),
        as: 'textarea'
      },
      attrs: {
        'data-chakra-component': 'CTextarea'
      },
      on: {
        input: (value, $e) => this.$emit('change', value, $e)
      }
    }, this.$slots.default)
  }
}

export default CTextarea
