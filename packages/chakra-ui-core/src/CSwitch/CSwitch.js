/**
 * Hey! Welcome to @chakra-ui/vue CSwitch
 *
 * The Switch component is used as an alternative for the Checkbox
 * component, switch between enabled or disabled states.
 *
 * @see Docs     https://vue.chakra-ui.com/stat
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CSwitch/CSwitch.js
 */

import styleProps from '../config/props'
import { forwardProps } from '../utils'

import CBox from '../CBox'
import CVisuallyHidden from '../CVisuallyHidden'
import CControlBox from '../CControlBox'

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

/**
 * CSwitch component
 *
 * the switch component that serves as an alternative for checkbox.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/stat
 */
const CSwitch = {
  name: 'CSwitch',
  model: {
    prop: 'isChecked',
    event: 'change'
  },
  inject: ['$chakraColorMode'],
  props: {
    ...styleProps,
    id: String,
    name: String,
    value: Boolean,
    _ariaLabel: String,
    _ariaLabelledBy: String,
    color: {
      type: String,
      default: 'blue'
    },
    defaultIsChecked: Boolean,
    isChecked: Boolean,
    size: {
      type: String,
      default: 'md'
    },
    isDisabled: Boolean,
    isInvalid: Boolean
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
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
    return h(CBox, {
      props: {
        ...forwardProps(this.$props),
        as: 'label',
        display: 'inline-block',
        verticalAlign: 'middle'
      },
      attrs: {
        'data-chakra-component': 'CSwitch'
      }
    }, [
      h(CVisuallyHidden, {
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
        },
        nativeOn: {
          change: (e) => this.$emit('change', !this.isChecked, e)
        }
      }),
      h(CControlBox, {
        props: this.styleProps
      }, [
        h(CBox, {
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

export default CSwitch
