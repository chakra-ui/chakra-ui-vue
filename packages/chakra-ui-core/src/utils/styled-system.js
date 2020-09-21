import { background, border, color, borderRadius, flexbox, grid, layout, position, shadow, space, typography, compose } from 'styled-system'
import _css from '@styled-system/css'
import { propsConfig } from '../config/props'

/**
 * Existential getter function that can be used in any style declaration to get a value
 * from theme, with support for fallback values. This helps prevent errors from
 * throwing when a theme value is missing.
 * @param {Object} obj Theme property
 * @param {String} key Theme key
 * @param {String} def Definition if non-existent
 * @param {*} p
 * @param {*} undef
 */
export const __get = (obj, key, def, p, undef) => {
  key = key && key.split ? key.split('.') : [key]

  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef
  }

  return obj === undef ? def : obj
}

const baseEllipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

/**
 * @description Truncates text if `truncate` is set to true.
 * @param {Object} props Props
 */
const truncate = (props) => {
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
const clamp = (props) => {
  if (props.lineClamp) {
    return {
      ...baseEllipsis,
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': `${props.lineClamp}`
    }
  }
}

const decorate = (props) => {
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

/** Composes all styled-system css and theme props and returns resolved styles */
export const composeSystem = (props = {}, theme = {}) => ({
  ..._css(props)(theme),
  ...systemProps({ ...props, theme })
})
