import styleProps from '../config/props'
import { buttonProps } from './button.props'
import { forwardProps } from '../utils'
import createButtonStyles, { setIconSizes } from './button.styles'
import Box from '../Box'
import PseudoBox from '../PseudoBox'
import Spinner from '../Spinner'
import Icon from '../Icon'

/**
 * Icon component in button.
 */
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
          ...setIconSizes(this.$props),
          ...forwardProps(this.$props)
        }
      })
    } else {
      return h(Box, {
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
  name: 'Button',
  inject: ['$theme', '$colorMode'],
  props: {
    ...buttonProps,
    ...styleProps
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
    return h(PseudoBox, {
      props: {
        as: this.as,
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
      // TODO: fix icon spacing bug? Not really a bug but translation fo style values is weird
      this.leftIcon && !this.isLoading && h(ButtonIcon, {
        props: {
          mr: this.iconSpacing,
          mb: 'px',
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
          ml: this.iconSpacing,
          mb: 'px',
          icon: this.rightIcon,
          size: '1em'
        }
      })
    ])
  }
}
