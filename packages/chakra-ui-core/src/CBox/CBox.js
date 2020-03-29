
import { css } from 'emotion'
import { background, border, color, borderRadius, flexbox, grid, layout, position, shadow, space, typography, compose } from 'styled-system'
import { baseProps, propsConfig } from '../config/props'
import { forwardProps } from '../utils'

const baseEllipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

/**
 * @description Truncates text if `truncate` is set to true.
 * @param {Object} props Props
 */
const truncate = props => {
  if (props.truncate) {
    if (!props.lineClamp) {
      return baseEllipsis
    }
  }
}

/**
 * @description Clamps text based on number of lines.
 * @param {Object} props Props
 */
const clamp = props => {
  if (props.lineClamp) {
    return {
      ...baseEllipsis,
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': `${props.lineClamp}`
    }
  }
}

const decorate = props => {
  if (props.textDecoration || props.textDecor) {
    return {
      'text-decoration': `${props.textDecoration || props.textDecor}`
    }
  }
}

export const systemProps = compose(
  space,
  layout,
  color,
  background,
  border,
  borderRadius,
  grid,
  position,
  shadow,
  decorate,
  typography,
  flexbox,
  propsConfig,
  truncate,
  clamp
)

const CBox = {
  name: 'CBox',
  inject: ['$theme'],
  props: {
    as: {
      type: [String, Object],
      default: 'div'
    },
    to: {
      type: [String, Object],
      default: ''
    },
    ...baseProps
  },
  computed: {
    theme () {
      return this.$theme()
    }
  },
  render (h) {
    const { as, to, ...cleanedStyleProps } = forwardProps(this.$props)
    const boxStylesObject = systemProps({ ...cleanedStyleProps, theme: this.theme })

    return h(as, {
      props: { to },
      class: css(boxStylesObject),
      on: this.$listeners
    }, this.$slots.default)
  }
}

export default CBox
