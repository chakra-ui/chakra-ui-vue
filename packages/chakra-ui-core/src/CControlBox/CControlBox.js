/**
 * Hey! Welcome to @chakra-ui/vue ControlBox
 *
 * ControlBox provides style props to change it's styles based
 * on a sibling checkbox or radio input.
 *
 * In order to keep prerve accessiblity, it relies on a common
 * [CSS technique](https://dev.to/lkopacz/create-custom-keyboard-accessible-checkboxes-2036)
 * for styling custom controls.
 *
 * > For this component to work, it should have a sibling input and be contained in a label
 *
 * @see Docs     https://vue.chakra-ui.com/controlbox
 * @see Strategy https://dev.to/lkopacz/create-custom-keyboard-accessible-checkboxes-2036
 */

import { css } from 'emotion'
import __css from '@styled-system/css'
import { tx } from '../utils'
import CBox from '../CBox'

// Default ControlBox props types
const PseudoPropTypes = [Object, Array]

/**
 * CControlBox component
 *
 * Provides a wrapper to create custom style `radio` and `checkbox` inputs
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/controlbox
 */
const CControlBox = {
  name: 'CControlBox',
  functional: true,
  inject: ['$chakraTheme'],
  props: {
    as: [String, Object],
    type: {
      type: String,
      default: 'checkbox'
    },
    size: {
      type: [Number, String, Array],
      default: 'auto'
    },
    _child: {
      type: PseudoPropTypes,
      default: () => ({ opacity: 0 })
    },
    _checkedAndChild: {
      type: PseudoPropTypes,
      default: () => ({ opacity: 1 })
    },
    _checkedAndDisabled: PseudoPropTypes,
    _checkedAndFocus: PseudoPropTypes,
    _checkedAndHover: PseudoPropTypes
  },
  render (h, { props, data, injections, listeners, slots }) {
    const { attrs } = data

    // Inject theme
    const theme = injections.$chakraTheme()

    // Parse child styles
    const checkedAndDisabled = `input[type=${props.type}]:checked:disabled + &, input[type=${props.type}][aria-checked=mixed]:disabled + &`
    const checkedAndHover = `input[type=${props.type}]:checked:hover:not(:disabled) + &, input[type=${props.type}][aria-checked=mixed]:hover:not(:disabled) + &`
    const checkedAndFocus = `input[type=${props.type}]:checked:focus + &, input[type=${props.type}][aria-checked=mixed]:focus + &`
    const disabled = `input[type=${props.type}]:disabled + &`
    const focus = `input[type=${props.type}]:focus + &`
    const hover = `input[type=${props.type}]:hover:not(:disabled):not(:checked) + &`
    const checked = `input[type=${props.type}]:checked + &, input[type=${props.type}][aria-checked=mixed] + &`
    const invalid = `input[type=${props.type}][aria-invalid=true] + &`

    const controlBoxStyleObject = __css({
      [focus]: tx(attrs._focus),
      [hover]: tx(attrs._hover),
      [disabled]: tx(attrs._disabled),
      [invalid]: tx(attrs._invalid),
      [checkedAndDisabled]: tx(props._checkedAndDisabled),
      [checkedAndFocus]: tx(props._checkedAndFocus),
      [checkedAndHover]: tx(props._checkedAndHover),
      '& > *': tx(props._child),
      [checked]: {
        ...tx(attrs._checked),
        '& > *': tx(props._checkedAndChild)
      }
    })(theme)

    const className = css(controlBoxStyleObject)

    return h(CBox, {
      class: [className],
      props: { as: props.as },
      attrs: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 120ms',
        flexShrink: '0',
        width: props.size,
        height: props.size,
        'aria-hidden': 'true',
        ...attrs,
        'data-chakra-component': 'CControlBox'
      }
    }, slots().default)
  }
}

export default CControlBox
