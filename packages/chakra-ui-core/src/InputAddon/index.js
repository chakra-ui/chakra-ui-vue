import Box from '../Box'
import styleProps from '../config/props'
import useInputStyle from '../Input/input.styles'
import { forwardProps } from '../utils'

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

const InputAddon = {
  name: 'InputAddon',
  inject: ['$colorMode', '$theme'],
  props: addonProps,
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
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

    return h(Box, {
      props: {
        ...forwardProps(this.$props),
        ...styleProps
      }
    }, this.$slots.default)
  }
}

const InputLeftAddon = {
  name: 'InputLeftAddon',
  props: addonProps,
  render (h) {
    return h(InputAddon, {
      props: {
        ...forwardProps(this.$props),
        placement: 'left'
      }
    }, this.$slots.default)
  }
}

const InputRightAddon = {
  name: 'InputRightAddon',
  props: addonProps,
  render (h) {
    return h(InputAddon, {
      props: {
        ...forwardProps(this.$props),
        placement: 'right'
      }
    }, this.$slots.default)
  }
}

export default InputAddon
export { InputLeftAddon, InputRightAddon }
