import Input from '../Input'
import { forwardProps } from '../utils'

const Textarea = {
  name: 'Textarea',
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  extends: Input,
  props: {
    inputValue: String
  },
  render (h) {
    return h(Input, {
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

export default Textarea
