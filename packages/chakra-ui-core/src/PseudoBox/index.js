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
    ...styleProps
  },
  computed: {
    theme () {
      return this.$theme()
    }
  },
  render (h) {
    const { as, ...cleanedStyleProps } = this.$props
    const { pseudoStyles, baseProps } = parsePseudoStyles(cleanedStyleProps)
    const baseStyles = systemProps({ ...baseProps, theme: this.theme })
    const _pseudoStyles = __css(pseudoStyles)(this.theme)
    const className = css({ ...baseStyles, ..._pseudoStyles })

    return h(Box, {
      class: [className],
      props: {
        as
      }
    }, this.$slots.default)
  }
}

export default PseudoBox
