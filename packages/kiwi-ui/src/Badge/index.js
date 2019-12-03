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
    _ref: {
      type: HTMLElement
    },
    ...baseProps
  },
  render (h) {
    const badgeStyleProps = useBadgeStyles({
      theme: this.$theme(),
      colorMode: this.$colorMode,
      color: this.variantColor,
      variant: this.variant
    })

    return h(Box, {
      props: {
        d: 'inline-block',
        textTransform: 'uppercase',
        fontSize: 'xs',
        fontFamily: 'body',
        px: 1,
        rounded: 'sm',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        ...badgeStyleProps,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}
