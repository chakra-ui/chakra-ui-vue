import styled from 'vue-styled-components'
import { background, border, color, borderRadius, flexbox, grid, layout, position, shadow, space, typography } from 'styled-system'
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

// TODO: Implement Ripple (For Button)

/**
 * Note: All styled components in vue-styled-components forward all their props.
 * If the prop is not registered in the child, it is then it is bound as a native
 * HTML attribute
 * @see https://github.com/styled-components/vue-styled-components#passed-props
 * TODO: Will need to revisit this for Image component.
 */
const Box = styled('div', {
  ...baseBoxProps

})(
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

export default Box
