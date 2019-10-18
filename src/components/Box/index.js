import styled from 'vue-styled-components'
import { background, border, color, borderRadius, flexbox, grid, layout, position, shadow, space, typography, compose } from 'styled-system'
import { baseBoxProps } from './props'
import styledConfig from './config'

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

// Compose @style-system style functions
const system = compose(
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
  styledConfig,
  truncate,
  clamp
)

/**
 * @description Clears out all undefined props that are undefined from the props object
 * @param {Object} props
 * @returns {Object} Sanitized props object with defined values.
 */
function cleanProps (props) {
  for (const prop in props) {
    if (/* props[prop] === null|| */ props[prop] === undefined) {
      delete props[prop]
    }
  }
  return props
}

/**
 * Note: All styled components in vue-styled-components forward all their props.
 * If the prop is not registered in the child, it is then it is bound as a native
 * HTML attribute
 * @see https://github.com/styled-components/vue-styled-components#passed-props
 * TODO: Will need to revisit this for Image component.
 */
const Box = styled('div', {
  ...baseBoxProps
})`
  ${props => {
    const sanitizedProps = cleanProps(props)
    return system(sanitizedProps)
  }}
`

export default Box
