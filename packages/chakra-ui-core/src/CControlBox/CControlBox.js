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

import { css } from '@emotion/css'
import { composeSystem } from '../utils/chakra-styled-system'
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
  render (h, { props, data, injections, slots }) {
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

    const basePseudoAttrs = (attrs && ({
      [focus]: (attrs._focus),
      [hover]: (attrs._hover),
      [disabled]: (attrs._disabled),
      [invalid]: (attrs._invalid)
    })) || {}

    const controlBoxStyleObject = composeSystem({
      ...basePseudoAttrs,
      [checkedAndDisabled]: (props._checkedAndDisabled),
      [checkedAndFocus]: (props._checkedAndFocus),
      [checkedAndHover]: (props._checkedAndHover),
      '& > *': (props._child),
      [checked]: {
        ...attrs && (attrs._checked),
        '& > *': (props._checkedAndChild)
      }
    }, theme)

    const className = css(controlBoxStyleObject)

    return h(CBox, {
      ...data,
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
