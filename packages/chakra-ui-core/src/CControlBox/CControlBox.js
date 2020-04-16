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
import { tx, forwardProps } from '../utils'
import { baseProps } from '../config'

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
  inject: ['$chakraTheme'],
  props: {
    type: {
      type: String,
      default: 'checkbox'
    },
    size: {
      type: [Number, String, Array],
      default: 'auto'
    },
    _hover: PseudoPropTypes,
    _invalid: PseudoPropTypes,
    _disabled: PseudoPropTypes,
    _focus: PseudoPropTypes,
    _checked: PseudoPropTypes,
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
    _checkedAndHover: PseudoPropTypes,
    ...baseProps
  },
  computed: {
    theme () {
      return this.$chakraTheme()
    },
    className () {
      const checkedAndDisabled = `input[type=${this.type}]:checked:disabled + &, input[type=${this.type}][aria-checked=mixed]:disabled + &`
      const checkedAndHover = `input[type=${this.type}]:checked:hover:not(:disabled) + &, input[type=${this.type}][aria-checked=mixed]:hover:not(:disabled) + &`
      const checkedAndFocus = `input[type=${this.type}]:checked:focus + &, input[type=${this.type}][aria-checked=mixed]:focus + &`
      const disabled = `input[type=${this.type}]:disabled + &`
      const focus = `input[type=${this.type}]:focus + &`
      const hover = `input[type=${this.type}]:hover:not(:disabled):not(:checked) + &`
      const checked = `input[type=${this.type}]:checked + &, input[type=${this.type}][aria-checked=mixed] + &`
      const invalid = `input[type=${this.type}][aria-invalid=true] + &`

      const controlBoxStyleObject = __css({
        [focus]: tx(this._focus),
        [hover]: tx(this._hover),
        [disabled]: tx(this._disabled),
        [invalid]: tx(this._invalid),
        [checkedAndDisabled]: tx(this._checkedAndDisabled),
        [checkedAndFocus]: tx(this._checkedAndFocus),
        [checkedAndHover]: tx(this._checkedAndHover),
        '& > *': tx(this._child),
        [checked]: {
          ...tx(this._checked),
          '& > *': tx(this._checkedAndChild)
        }
      })(this.theme)
      return css(controlBoxStyleObject)
    }
  },
  render (h) {
    return h(CBox, {
      class: [this.className],
      props: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 120ms',
        flexShrink: '0',
        width: this.size,
        height: this.size,
        ...forwardProps(this.$props)
      },
      attrs: {
        'aria-hidden': 'true',
        'data-chakra-component': 'CControlBox'
      }
    }, this.$slots.default)
  }
}

export default CControlBox
