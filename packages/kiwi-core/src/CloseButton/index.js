import Icon from '../Icon'
import PseudoBox from '../PseudoBox'
import styleProps from '../config/props'
import { forwardProps } from '../utils'

const baseProps = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  rounded: 'md',
  transition: 'all 0.2s',
  flex: '0 0 auto',
  _hover: { bg: 'blackAlpha.100' },
  _active: { bg: 'blackAlpha.200' },
  _disabled: {
    cursor: 'not-allowed'
  },
  _focus: {
    boxShadow: 'outline'
  },
  border: 'none',
  bg: 'blackAlpha.50'
}

const sizes = {
  lg: {
    button: '40px',
    icon: '16px'
  },
  md: {
    button: '32px',
    icon: '12px'
  },
  sm: {
    button: '24px',
    icon: '10px'
  }
}

export default {
  name: 'CloseButton',
  inject: ['$theme', '$colorMode'],
  props: {
    size: {
      type: String,
      default: 'md',
      validator: value => value.match(/^(sm|md|lg)$/)
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'currentColor'
    },
    _ariaLabel: {
      type: String,
      default: 'Close'
    },
    ...styleProps
  },
  render (h) {
    // Pseudo styles
    const hoverColor = { light: 'blackAlpha.100', dark: 'whiteAlpha.100' }
    const activeColor = { light: 'blackAlpha.200', dark: 'whiteAlpha.200' }

    // Size styles
    const buttonSize = sizes[this.size] && sizes[this.size]['button']
    const iconSize = sizes[this.size] && sizes[this.size]['icon']

    return h(PseudoBox, {
      props: {
        as: 'button',
        outline: 'none',
        h: buttonSize,
        w: buttonSize,
        disabled: this.isDisabled,
        cursor: 'pointer',
        _hover: { bg: hoverColor[this.colorMode] },
        _active: { bg: activeColor[this.colorMode] },
        ...baseProps,
        ...forwardProps(this.$props)
      },
      on: {
        click: ($e) => this.$emit('click', $e)
      },
      attrs: {
        ariaLabel: this._ariaLabel,
        ariaDisabled: this.isDisabled
      }
    }, [h(Icon, {
      props: {
        color: this.color,
        name: 'close',
        size: iconSize
      },
      attrs: {
        focusable: false,
        ariaHidden: true
      }
    })])
  }
}
