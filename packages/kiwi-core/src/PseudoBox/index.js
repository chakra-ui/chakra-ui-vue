import styled from 'vue-styled-components'
import css from '@styled-system/css'
import Box from '../Box'
import { pseudoProps } from '../config/props'
import { parsePseudoStyles } from './utils'

/**
 * The PseudoBox component is a wrapper for the Box component that allows us to provide pseudo styles for `_focus`, `_hover`, `_active`, etc. and `aria-*` attributes
 */
const PseudoBox = styled(Box, {
  ...pseudoProps
})`
  ${(props) => {
    const styles = parsePseudoStyles(props)
    return css(styles)
  }
}`

export default PseudoBox
