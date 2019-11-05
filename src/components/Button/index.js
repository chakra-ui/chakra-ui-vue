import styleProps from '../../lib/config/props'
import { forwardProps } from '../../lib/utils'
import createButtonStyles from './button.styles'
import { Box, PseudoBox, Spinner, Icon } from '../../lib/core'

/**
 * Icon component in button.
 */
const sizes = {
  xs: {
    w: '0.75rem',
    h: '0.75rem'
  },
  sm: {
    w: '1rem',
    h: '1rem'
  },
  md: {
    w: '1.5rem',
    h: '1.5rem'
  },
  lg: {
    w: '2rem',
    h: '2rem'
  },
  xl: {
    w: '3rem',
    h: '3rem'
  }
}

const createCustomSize = (size) => {
  return {
    w: size,
    h: size
  }
}

const setSizes = (props) => {
  return sizes[props.size] || createCustomSize(props.size)
}

const ButtonIcon = {
  name: 'ButtonIcon',
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
      return h(Icon, {
        props: {
          focusable: false,
          name: this.icon,
          color: 'currentColor',
          mb: '-2px',
          ...setSizes(this.$props),
          ...forwardProps(this.$props)
        }
      })
    } else {
      return h(Box, {
        props: {
          as: this.icon,
          focusable: false,
          color: 'currentColor',
          mb: '-2px',
          ...setSizes(this.$props)
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
  name: 'Button',
  components: {
    PseudoBox
  },
  inject: ['$theme', '$colorMode'],
  props: {
    as: {
      type: [String, Object],
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    cast: {
      type: String,
      default: 'primary',
      validator: (value) =>
        value.match(/^(primary|secondary|success|warning|danger)$/)
    },
    variant: {
      type: String,
      default: 'solid',
      validator: (value) =>
        value.match(/^(solid|outline|ghost|flat|link)$/)
    },
    variantColor: {
      type: [String, Array],
      default: 'gray'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => value.match(/^(sm|md|lg)$/)
    },
    loadingText: {
      type: String,
      default: 'Loading',
      validator: (value) => typeof value === 'string'
    },
    iconSpacing: {
      type: [String, Number],
      default: 2,
      validator: (value) => value >= 0
    },
    leftIcon: {
      type: String,
      default: null
    },
    rightIcon: {
      type: String,
      default: null
    },
    rounded: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: [String, Boolean],
      default: true
    },
    ...styleProps
  },
  render (h) {
    const buttonStyles = createButtonStyles({
      color: this.variantColor || this.cast,
      variant: this.variant,
      theme: this.$theme,
      ripple: this.ripple,
      colorMode: this.$colorMode,
      size: this.size || 'md'
    })
    return h(PseudoBox, {
      props: {
        as: this.as,
        outline: 'none',
        cursor: 'pointer',
        fontSize: 'md',
        fontWeight: '700',
        border: 'none',
        transition: 'all 0.2s ease-in',
        rounded: 'md',
        ...buttonStyles,
        ...forwardProps(this.$props)
      },
      attrs: {
        type: this.type,
        tabIndex: 0,
        disabled: this.disabled || this.isLoading,
        ariaDisabled: this.disabled || this.isLoading,
        dataActive: this.isActive ? 'true' : undefined
      },
      on: {
        click: ($event) => this.$emit('click', $event)
      }
    }, [
      this.leftIcon && !this.isLoading && h(ButtonIcon, {
        props: {
          ml: -1,
          mr: this.iconSpacing,
          icon: this.leftIcon,
          size: '1em'
        }
      }),
      this.isLoading && h(Spinner, {
        props: {
          position: this.loadingText ? 'relative' : 'absolute',
          color: 'currentColor',
          mb: '-4px',
          mr: this.loadingText ? this.iconSpacing : 0,
          size: '1em'
        }
      }),
      this.isLoading ? this.loadingText : this.$slots.default,
      this.rightIcon && !this.isLoading && h(ButtonIcon, {
        props: {
          mr: -1,
          ml: this.iconSpacing,
          icon: this.rightIcon,
          size: '1em'
        }
      })
    ])
  }
}
