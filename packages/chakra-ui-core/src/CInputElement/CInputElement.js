import { baseProps } from '../config'
import { inputSizes } from '../CInput/utils/input.styles'
import CBox from '../CBox'
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

const CInputElement = {
  name: 'CInputElement',
  props,
  render (h) {
    const height = inputSizes[this.size] && inputSizes[this.size]['height']
    const fontSize = inputSizes[this.size] && inputSizes[this.size]['fontSize']
    const placementProp = { [this.placement]: '0' }

    return h(CBox, {
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

const CInputLeftElement = {
  name: 'CInputLeftElement',
  props,
  render (h) {
    return h(CInputElement, {
      props: {
        ...forwardProps(this.$props),
        placement: 'left'
      }
    }, this.$slots.default)
  }
}

const CInputRightElement = {
  name: 'CInputRightElement',
  props,
  render (h) {
    return h(CInputElement, {
      props: {
        ...forwardProps(this.$props),
        placement: 'right'
      }
    }, this.$slots.default)
  }
}

export default CInputElement
export { CInputLeftElement, CInputRightElement }
