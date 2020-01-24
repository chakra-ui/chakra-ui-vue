import { css } from 'emotion'
import __css from '@styled-system/css'
import Box from '../Box'
import { tx, forwardProps } from '../utils'
import { baseProps } from '../config'

// Default ControlBox props types
const PropTypes = [Object, Array]

const ControlBox = {
  name: 'ControlBox',
  inject: ['$theme'],
  props: {
    type: {
      type: String,
      default: 'checkbox'
    },
    size: {
      type: [Number, String, Array],
      default: 'auto'
    },
    _hover: PropTypes,
    _invalid: PropTypes,
    _disabled: PropTypes,
    _focus: PropTypes,
    _checked: PropTypes,
    _child: {
      type: PropTypes,
      default: () => ({ opacity: 0 })
    },
    _checkedAndChild: {
      type: PropTypes,
      default: () => ({ opacity: 1 })
    },
    _checkedAndDisabled: PropTypes,
    _checkedAndFocus: PropTypes,
    _checkedAndHover: PropTypes,
    ...baseProps
  },
  computed: {
    theme () {
      return this.$theme()
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
    return h(Box, {
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
        'aria-hidden': 'true'
      }
    }, this.$slots.default)
  }
}

export default ControlBox
