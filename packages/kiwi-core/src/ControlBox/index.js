import styled from 'vue-styled-components'
import css from '@styled-system/css'
import Box from '../Box'
// import { baseProps } from '../config/props'
import { tx } from '../utils'

// Default ControlBox props types
const PropTypes = [Object, Array]

const ControlBox = styled(Box, {
  type: {
    type: PropTypes,
    default: 'checkbox'
  },
  _hover: PropTypes,
  _invalid: PropTypes,
  _disabled: PropTypes,
  _focus: PropTypes,
  _checked: PropTypes,
  _child: {
    type: PropTypes,
    default: { opacity: 0 }
  },
  _checkedAndChild: {
    type: PropTypes,
    default: { opacity: 1 }
  },
  _checkedAndDisabled: PropTypes,
  _checkedAndFocus: PropTypes,
  _checkedAndHover: PropTypes
})`
  ${(props) => {
    const checkedAndDisabled = `input[type=${props.type}]:checked:disabled + &, input[type=${props.type}][aria-checked=mixed]:disabled + &`
    const checkedAndHover = `input[type=${props.type}]:checked:hover:not(:disabled) + &, input[type=${props.type}][aria-checked=mixed]:hover:not(:disabled) + &`
    const checkedAndFocus = `input[type=${props.type}]:checked:focus + &, input[type=${props.type}][aria-checked=mixed]:focus + &`
    const disabled = `input[type=${props.type}]:disabled + &`
    const focus = `input[type=${props.type}]:focus + &`
    const hover = `input[type=${props.type}]:hover:not(:disabled):not(:checked) + &`
    const checked = `input[type=${props.type}]:checked + &, input[type=${props.type}][aria-checked=mixed] + &`
    const invalid = `input[type=${props.type}][aria-invalid=true] + &`

    return css({
      [focus]: tx(props._focus),
      [hover]: tx(props._hover),
      [disabled]: tx(props._disabled),
      [invalid]: tx(props._invalid),
      [checkedAndDisabled]: tx(props._checkedAndDisabled),
      [checkedAndFocus]: tx(props._checkedAndFocus),
      [checkedAndHover]: tx(props._checkedAndHover),
      '& > *': tx(props._child),
      [checked]: {
        ...tx(props._checked),
        '& > *': tx(props._checkedAndChild)
      }
    })
  }
}`

export default ControlBox
