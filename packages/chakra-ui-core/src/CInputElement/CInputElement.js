/**
 * Hey! Welcome to @chakra-ui/vue CInputElement
 *
 * InputElement allows addition of add an icon or button inside the input component
 *
 * @see Docs     https://vue.chakra-ui.com/input
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CInputElement/CInputElement.js
 */

import { inputSizes } from '../CInput/utils/input.styles'
import CBox from '../CBox'
import { forwardProps } from '../utils'

const props = {
  size: String,
  placement: {
    type: String,
    default: 'left'
  },
  disablePointerEvents: Boolean,
  fine: Boolean
}

/**
 * CInputElement component
 *
 * allows addition of an icon or button inside the input component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/input
 */
const CInputElement = {
  name: 'CInputElement',
  functional: true,
  props,
  render (h, { props, slots, data, ...rest }) {
    const height = inputSizes[props.size] && inputSizes[props.size].height
    const fontSize = inputSizes[props.size] && inputSizes[props.size].fontSize
    const placementProp = { [props.placement]: '0' }
    return h(CBox, {
      ...rest,
      attrs: {
        'data-chakra-component': 'CInputElement',
        ...data.attrs,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: height,
        height,
        fontSize,
        top: 0,
        zIndex: 2,
        ...(props.disablePointerEvents && { pointerEvents: 'none' }),
        ...placementProp
      }
    }, slots().default)
  }
}

/**
 * CInputLeftElement component
 *
 * allows addition of an icon or button inside left of the input component
 *
 * @extends CInputElement
 * @see Docs https://vue.chakra-ui.com/input
 */
const CInputLeftElement = {
  name: 'CInputLeftElement',
  props,
  render (h) {
    return h(CInputElement, {
      props: {
        ...forwardProps(this.$props),
        placement: 'left'
      },
      attrs: {
        ...this.$attrs,
        'data-chakra-component': 'CInputLeftElement'
      }
    }, this.$slots.default)
  }
}

/**
 * CInputRightElement component
 *
 * allows addition of an icon or button inside right of the input component
 *
 * @extends CInputElement
 * @see Docs https://vue.chakra-ui.com/input
 */
const CInputRightElement = {
  name: 'CInputRightElement',
  props,
  render (h) {
    return h(CInputElement, {
      props: {
        ...forwardProps(this.$props),
        placement: 'right'
      },
      attrs: {
        ...this.$attrs,
        'data-chakra-component': 'CInputRightElement'
      }
    }, this.$slots.default)
  }
}

export default CInputElement
export { CInputLeftElement, CInputRightElement }
