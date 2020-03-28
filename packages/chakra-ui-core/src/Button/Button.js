import styleProps from '../config/props'
import { buttonProps } from './button.props'
import { forwardProps } from '../utils'
import createButtonStyles, { setIconSizes } from './button.styles'
import CBox from '../Box'
import CPseudoBox from '../PseudoBox'
import CSpinner from '../Spinner'
import CIcon from '../Icon'

/**
 * Icon component in button.
 */
const CButtonIcon = {
  name: 'CButtonIcon',
  props: {
    icon: {
      type: [String, Object]
    },
    size: {
      type: [String, Number]
    },
    ...styleProps
  },
  render (h) {
    if (typeof this.icon === 'string') {
      return h(CIcon, {
        props: {
          focusable: false,
          name: this.icon,
          color: 'currentColor',
          ...setIconSizes(this.$props),
          ...forwardProps(this.$props)
        }
      })
    } else {
      return h(CBox, {
        props: {
          as: this.icon,
          focusable: false,
          color: 'currentColor',
          ...setIconSizes(this.$props),
          ...forwardProps(this.$props)
        },
        attrs: {
          'data-custom-icon': true
        }
      })
    }
  }
}

/**
 * @description The Button component is an accessible rich component that does what a button does :)
 */
export default {
  name: 'CButton',
  inject: ['$theme', '$colorMode'],
  props: {
    ...buttonProps,
    ...styleProps,
    to: [String, Object]
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
    }
  },
  render (h) {
    const buttonStyles = createButtonStyles({
      color: this.variantColor || this.cast,
      variant: this.variant,
      theme: this.theme,
      ripple: this.ripple,
      colorMode: this.colorMode,
      size: this.size || 'md'
    })

    return h(CPseudoBox, {
      props: {
        as: this.as,
        to: this.to,
        outline: 'none',
        cursor: 'pointer',
        fontSize: 'md',
        fontWeight: '700',
        border: 'none',
        rounded: 'md',
        width: this.isFullWidth ? 'full' : undefined,
        ...buttonStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        type: this.type,
        tabIndex: 0,
        disabled: this.isDisabled || this.isLoading,
        'aria-disabled': this.isDisabled || this.isLoading,
        dataActive: this.isActive ? 'true' : undefined
      },
      nativeOn: {
        click: ($event) => this.$emit('click', $event)
      }
    }, [
      this.leftIcon && h(CButtonIcon, {
        props: {
          mr: this.iconSpacing,
          mb: 'px',
          icon: this.leftIcon,
          size: '1em',
          opacity: this.isLoading ? 0 : 1
        }
      }),
      this.isLoading && h(CSpinner, {
        props: {
          position: this.loadingText ? 'relative' : 'absolute',
          color: 'currentColor',
          mb: '-4px',
          mr: this.loadingText ? this.iconSpacing : 0,
          size: '1em'
        },
        attrs: {
          'chakra-button-spinner': ''
        }
      }),
      this.isLoading ? this.loadingText || h(CBox, {
        props: {
          as: 'span',
          opacity: 0
        }
      }, this.$slots.default) : this.$slots.default,
      this.rightIcon && h(CButtonIcon, {
        props: {
          ml: this.iconSpacing,
          mb: 'px',
          icon: this.rightIcon,
          size: '1em',
          opacity: this.isLoading ? 0 : 1
        }
      })
    ])
  }
}
