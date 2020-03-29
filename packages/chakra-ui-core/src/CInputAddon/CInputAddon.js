import styleProps from '../config/props'
import useInputStyle from '../CInput/utils/input.styles'
import { forwardProps } from '../utils'

import CBox from '../CBox'

const addonProps = {
  ...styleProps,
  placement: {
    type: String,
    default: 'left'
  },
  size: {
    type: String,
    default: 'md'
  }
}

const CInputAddon = {
  name: 'CInputAddon',
  inject: ['$chakraColorMode', '$chakraTheme'],
  props: addonProps,
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    }
  },
  render (h) {
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

    const styleProps = {
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

    return h(CBox, {
      props: {
        ...forwardProps(this.$props),
        ...styleProps
      }
    }, this.$slots.default)
  }
}

const CInputLeftAddon = {
  name: 'CInputLeftAddon',
  props: addonProps,
  render (h) {
    return h(CInputAddon, {
      props: {
        ...forwardProps(this.$props),
        placement: 'left'
      },
      attrs: {
        'data-chakra-input-left-addon': ''
      }
    }, this.$slots.default)
  }
}

const CInputRightAddon = {
  name: 'CInputRightAddon',
  props: addonProps,
  render (h) {
    return h(CInputAddon, {
      props: {
        ...forwardProps(this.$props),
        placement: 'right'
      },
      attrs: {
        'data-chakra-input-right-addon': ''
      }
    }, this.$slots.default)
  }
}

export default CInputAddon
export { CInputLeftAddon, CInputRightAddon }
