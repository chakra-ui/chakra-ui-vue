import Box from '../Box'
import { forwardProps } from '../utils'
import { baseProps } from '../config/props'
import useBadgeStyles from './badge.styles'

export default {
  name: 'Badge',
  inject: ['$theme', '$colorMode'],
  props: {
    variant: {
      type: String,
      default: 'subtle'
    },
    variantColor: {
      type: String,
      default: 'gray'
    },
    ...baseProps
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    }
  },
  render (h) {
    const badgeStyleProps = useBadgeStyles({
      theme: this.$theme(),
      colorMode: this.colorMode,
      color: this.variantColor,
      variant: this.variant
    })

    return h(Box, {
      props: {
        ...forwardProps(this.$props),
        d: 'inline-block',
        textTransform: 'uppercase',
        fontSize: 'xs',
        fontFamily: 'body',
        px: 1,
        rounded: 'sm',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        ...badgeStyleProps
      }
    }, this.$slots.default)
  }
}
