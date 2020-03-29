import styleProps from '../config/props'
import { inputProps } from '../CInput/utils/input.props'
import { forwardProps } from '../utils'

import CInput from '../CInput'

const CTextarea = {
  name: 'CTextarea',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    ...styleProps,
    ...inputProps,
    inputValue: String
  },
  render (h) {
    return h(CInput, {
      props: {
        ...forwardProps(this.$props),
        as: 'textarea',
        py: '8px',
        minHeight: '80px',
        fontFamily: 'body',
        lineHeight: 'shorter'
      },
      on: {
        input: (value, $e) => this.$emit('change', value, $e)
      }
    }, this.$slots.default)
  }
}

export default CTextarea
