import Box from '../Box'
import styleProps from '../config/props'
import { forwardProps } from '../utils'
import VisuallyHidden from '../VisuallyHidden'
import ControlBox from '../ControlBox'

const switchSizes = {
  sm: {
    width: '1.375rem',
    height: '0.75rem'
  },
  md: {
    width: '1.875rem',
    height: '1rem'
  },
  lg: {
    width: '2.875rem',
    height: '1.5rem'
  }
}

const Switch = {
  name: '_Switch',
  inject: ['$colorMode'],
  props: {
    ...styleProps,
    id: String,
    name: String,
    value: String,
    _ariaLabel: String,
    _ariaLabelledBy: String,
    color: String,
    defaultIsChecked: Boolean,
    isChecked: Boolean,
    size: String,
    isDisabled: Boolean,
    isInvalid: Boolean
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    _width () {
      return switchSizes[this.size] && switchSizes[this.size]['width']
    },
    _height () {
      return switchSizes[this.size] && switchSizes[this.size]['height']
    },
    styleProps () {
      return {
        rounded: 'full',
        justifyContent: 'flex-start',
        width: this._width,
        height: this._height,
        bg: this.colorMode === 'dark' ? 'whiteAlpha.400' : 'gray.300',
        boxSizing: 'content-box',
        p: '2px',
        _checked: {
          bg: `${this.color}.500`
        },
        _child: {
          transform: `translateX(0)`
        },
        _checkedAndChild: {
          transform: `translateX(calc(${this._width} - ${this._height}))`
        },
        _focus: {
          boxShadow: 'outline'
        },
        _hover: {
          cursor: 'pointer'
        },
        _checkedAndHover: {
          cursor: 'pointer'
        },
        _disabled: {
          opacity: 0.4,
          cursor: 'not-allowed'
        }
      }
    }
  },
  render (h) {
    return h(Box, {
      props: {
        ...forwardProps(this.$props),
        as: 'label',
        display: 'inline-block',
        verticalAlign: 'middle'
      }
    }, [
      h(VisuallyHidden, {
        props: {
          as: 'input'
        },
        attrs: {
          type: 'checkbox',
          'aria-label': this._ariaLabel,
          'aria-labelledby': this._ariaLabelledBy,
          id: this.id,
          name: this.name,
          value: this.value,
          'aria-invalid': this.isInvalid,
          defaultChecked: this.defaultIsChecked,
          checked: this.isChecked,
          disabled: this.isDisabled
        }
      }),
      h(ControlBox, {
        props: this.styleProps
      }, [
        h(Box, {
          props: {
            bg: 'white',
            transition: 'transform 250ms',
            rounded: 'full',
            h: this._height,
            w: this._height
          }
        })
      ])
    ])
  }
}

export default Switch
