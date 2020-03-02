import styleProps from '../config/props'
import { inputProps } from '../Input/input.props'
import Input from '../Input'
import { forwardProps } from '../utils'

const Textarea = {
  name: 'Textarea',
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
    return h(Input, {
      props: {
        ...forwardProps(this.$props),
        as: 'textarea',
        py: '8px',
        minHeight: '80px',
        lineHeight: 'shorter'
      },
      on: {
        input: (value, $e) => this.$emit('change', value, $e)
      }
    }, this.$slots.default)
  }
}

export const ExpandingTextarea = {
  name: 'ExpandingTextarea'
}

export default Textarea
