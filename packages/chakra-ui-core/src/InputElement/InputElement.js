import { baseProps } from '../config'
import { inputSizes } from '../Input/input.styles'
import Box from '../Box'
import { forwardProps } from '../utils'

const props = {
  ...baseProps,
  size: String,
  placement: {
    type: String,
    default: 'left'
  },
  disablePointerEvents: Boolean
}

const InputElement = {
  name: 'InputElement',
  props,
  render (h) {
    const height = inputSizes[this.size] && inputSizes[this.size]['height']
    const fontSize = inputSizes[this.size] && inputSizes[this.size]['fontSize']
    const placementProp = { [this.placement]: '0' }

    return h(Box, {
      props: {
        ...forwardProps(this.$props),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: height,
        height,
        fontSize,
        top: 0,
        zIndex: 2,
        ...(this.disablePointerEvents && { pointerEvents: 'none' }),
        ...placementProp
      }
    }, this.$slots.default)
  }
}

const InputLeftElement = {
  name: 'InputLeftElement',
  props,
  render (h) {
    return h(InputElement, {
      props: {
        ...forwardProps(this.$props),
        placement: 'left'
      }
    }, this.$slots.default)
  }
}

const InputRightElement = {
  name: 'InputRightElement',
  props,
  render (h) {
    return h(InputElement, {
      props: {
        ...forwardProps(this.$props),
        placement: 'right'
      }
    }, this.$slots.default)
  }
}

export default InputElement
export { InputLeftElement, InputRightElement }
