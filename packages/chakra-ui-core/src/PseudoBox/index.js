import { css } from 'emotion'
import __css from '@styled-system/css'
import { background, border, color, borderRadius, flexbox, grid, layout, position, shadow, space, typography, compose } from 'styled-system'
import Box from '../Box'
import styleProps, { propsConfig } from '../config/props'
import { parsePseudoStyles } from './utils'

const systemProps = compose(
  layout,
  color,
  space,
  background,
  border,
  borderRadius,
  grid,
  position,
  shadow,
  typography,
  flexbox,
  propsConfig
)

const PseudoBox = {
  name: 'PseudoBox',
  inject: ['$theme'],
  props: {
    as: {
      type: [String, Object],
      default: () => 'div'
    },
    to: [String, Object],
    ...styleProps
  },
  computed: {
    theme () {
      return this.$theme()
    }
  },
  render (h) {
    const { as, to, ...cleanedStyleProps } = this.$props
    const { pseudoStyles, baseProps } = parsePseudoStyles(cleanedStyleProps)
    const baseStyles = systemProps({ ...baseProps, theme: this.theme })
    const _pseudoStyles = __css(pseudoStyles)(this.theme)

    return h(Box, {
      class: css({ ...baseStyles, ..._pseudoStyles }),
      props: {
        as,
        to
      }
    }, this.$slots.default)
  }
}

export default PseudoBox
