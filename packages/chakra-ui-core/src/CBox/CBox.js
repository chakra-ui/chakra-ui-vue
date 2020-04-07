/**
 * Hey! Welcome to @chakra-ui/vue Box
 *
 * Box is the most abstract component on top of which all
 * other @chakra-ui/vue components are built. By default, it renders a `div` element
 *
 * @see Docs     https://vue.chakra-ui.com/box
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CBox/CBox.js
 */

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

/**
 * CBox component
 *
 * Abstract component on top of which all other Chakra components are built.
 *
 * @see Docs https://vue.chakra-ui.com/box
 */
const CBox = {
  name: 'CBox',
  inject: ['$chakraTheme'],
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
      return this.$chakraTheme()
    }
  },
  render (h) {
    const { as, to, ...cleanedStyleProps } = forwardProps(this.$props)
    const boxStylesObject = systemProps({ ...cleanedStyleProps, theme: this.theme })

    return h(as, {
      props: { to },
      class: css(boxStylesObject),
      on: this.$listeners,
      attrs: {
        'data-chakra-component': 'CBox'
      }
    }, this.$slots.default)
  }
}

export default CBox
