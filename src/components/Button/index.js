import PseudoBox from '../PseudoBox'
import styleProps from '../../lib/config/props'
import { forwardProps } from '../../lib/utils'
import createButtonStyles from './button.styles'
import { Spinner } from '../../lib/core'

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
      type: String,
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
      this.leftIcon && !this.isLoading && h(Spinner),
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
      this.rightIcon && !this.isLoading && h(Spinner)
    ])
  }
}
