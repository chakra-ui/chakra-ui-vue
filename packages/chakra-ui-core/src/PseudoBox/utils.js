import map from 'lodash-es/map'
import { forwardProps, filterBaseStyles, filterPseudo as getPseudoStyles, tx } from '../utils'

/**
 * PseudoBox pseudo selectors
 */
export const selectors = {
  _hover: '&:hover',
  _active: '&:active, &[data-active=true]',
  _focus: '&:focus',
  _visited: '&:visited',
  _even: '&:nth-of-type(even)',
  _odd: '&:nth-of-type(odd)',
  _disabled: '&:disabled, &:disabled:focus, &:disabled:hover, &[aria-disabled=true], &[aria-disabled=true]:focus, &[aria-disabled=true]:hover',
  _checked: '&[aria-checked=true]',
  _mixed: '&[aria-checked=mixed]',
  _selected: '&[aria-selected=true]',
  _invalid: '&[aria-invalid=true]',
  _pressed: '&[aria-pressed=true]',
  _readOnly: '&[aria-readonly=true], &[readonly]',
  _first: '&:first-of-type',
  _last: '&:last-of-type',
  _expanded: '&[aria-expanded=true]',
  _grabbed: '&[aria-grabbed=true]',
  _notFirst: '&:not(:first-of-type)',
  _notLast: '&:not(:last-of-type)',
  _groupHover: '[role=group]:hover &',
  _before: '&:before',
  _after: '&:after',
  _focusWithin: '&:focus-within',
  _placeholder: '&::placeholder'
}

/**
 * Filter undefined props and parse pseudo style props to generate css styles object
 * @param {Object} props - Props
 * @returns {Object} Parsed pseudo styles object
 */
export function parsePseudoStyles (props) {
  const pseudoStyles = {}
  const clean = forwardProps(props)
  const pseudoProps = getPseudoStyles(clean)
  const baseProps = filterBaseStyles(clean)
  const result = map(pseudoProps, (value, prop) => ({ prop, value }))
  result.forEach((pair) => {
    if (selectors[pair.prop]) {
      pseudoStyles[selectors[pair.prop]] = tx(pair.value)
    }
  })
  const mergedPseudoBoxStyles = { pseudoStyles, baseProps }
  return mergedPseudoBoxStyles
}
