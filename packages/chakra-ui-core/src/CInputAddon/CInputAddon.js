/**
 * Hey! Welcome to @chakra-ui/vue InputAddon
 *
 * InputAddon allows addition of addons to the left and right of the CInput component
 *
 * @see Docs     https://vue.chakra-ui.com/input
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CInputAddon/CInputAddon.js
 */

import useInputStyle from '../CInput/utils/input.styles'
import { forwardProps, createStyledAttrsMixin } from '../utils'

const addonProps = {
  placement: {
    type: String,
    default: 'left'
  },
  size: {
    type: String,
    default: 'md'
  }
}

/**
 * CInputAddon component
 *
 * allows addition of addons to the left and right of the CInput component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/input
 */
const CInputAddon = {
  name: 'CInputAddon',
  mixins: [createStyledAttrsMixin('CInputAddon')],
  props: addonProps,
  computed: {
    componentStyles () {
      const bg = { dark: 'whiteAlpha.300', light: 'gray.100' }
      const _placement = {
        left: {
          mr: '-1px',
          roundedRight: 0,
          borderRightColor: 'transparent'
        },
        right: {
          order: 1,
          roundedLeft: 0,
          borderLeftColor: 'transparent'
        }
      }

      return {
        ...useInputStyle({
          size: this.size,
          variant: 'outline',
          colorMode: this.colorMode,
          theme: this.theme
        }),
        flex: '0 0 auto',
        whiteSpace: 'nowrap',
        bg: bg[this.colorMode],
        ..._placement[this.placement]
      }
    }
  },
  render (h) {
    return h(this.as, {
      class: [this.className],
      attrs: this.computedAttrs,
      on: this.computedListeners
    }, this.$slots.default)
  }
}

/**
 * CInputLeftAddon component
 *
 * allows addition of addons to the left of CInput component
 *
 * @extends CInputAddon
 * @see Docs https://vue.chakra-ui.com/input
 */
const CInputLeftAddon = {
  name: 'CInputLeftAddon',
  functional: true,
  props: addonProps,
  render (h, { props, slots, data }) {
    return h(CInputAddon, {
      props: {
        ...forwardProps(props),
        placement: 'left'
      },
      attrs: {
        ...data.attrs,
        'data-chakra-component': 'CInputLeftAddon'
      }
    }, slots().default)
  }
}

/**
 * CInputRightAddon component
 *
 * allows addition of addons to the right of CInput component
 *
 * @extends CInputAddon
 * @see Docs https://vue.chakra-ui.com/input
 */
const CInputRightAddon = {
  name: 'CInputRightAddon',
  functional: true,
  props: addonProps,
  render (h, { props, slots, data }) {
    return h(CInputAddon, {
      props: {
        ...forwardProps(props),
        placement: 'right'
      },
      attrs: {
        ...data.attrs,
        'data-chakra-component': 'CInputRightAddon'
      }
    }, slots().default)
  }
}

export default CInputAddon
export { CInputLeftAddon, CInputRightAddon }
