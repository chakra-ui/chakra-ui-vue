import { forwardProps } from '../utils'
import { baseProps } from '../config/props'
import useBadgeStyles from './utils/badge.styles'

import CBox from '../CBox'

const CBadge = {
  name: 'Badge',
  inject: ['$chakraTheme', '$chakraColorMode'],
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
      return this.$chakraColorMode()
    }
  },
  render (h) {
    const badgeStyleProps = useBadgeStyles({
      theme: this.$chakraTheme(),
      colorMode: this.colorMode,
      color: this.variantColor,
      variant: this.variant
    })

    return h(CBox, {
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

export default CBadge
