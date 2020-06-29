/**
 * Hey! Welcome to @chakra-ui/vue CInputElement
 *
 * InputElement allows addition of add an icon or button inside the input component
 *
 * @see Docs     https://vue.chakra-ui.com/input
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CInputElement/CInputElement.js
 */

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
  props,
  render (h) {
    const height = inputSizes[this.size] && inputSizes[this.size].height
    const fontSize = inputSizes[this.size] && inputSizes[this.size].fontSize
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
      },
      attrs: {
        'data-chakra-component': 'CInputElement'
      }
    }, this.$slots.default)
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
        'data-chakra-component': 'CInputRightElement'
      }
    }, this.$slots.default)
  }
}

export default CInputElement
export { CInputLeftElement, CInputRightElement }
