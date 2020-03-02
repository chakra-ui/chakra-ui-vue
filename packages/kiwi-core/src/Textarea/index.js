import styleProps from '../config/props'
import { inputProps } from '../Input/input.props'
import Input from '../Input'
import { forwardProps } from '../utils'

const Textarea = {
  name: 'Textarea',
  props: {
    ...styleProps,
    ...inputProps
  },
  render (h) {
    return h(Input, {
      props: {
        ...forwardProps(this.$props),
        as: 'textarea',
        py: '8px',
        minHeight: '80px',
        lineHeight: 'shorter'
      }
    }, this.$slots.default)
  }
}

export default Textarea
