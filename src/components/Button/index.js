import PseudoBox from '../PseudoBox'
import styleProps from '../../lib/config/props'

let generatedProps = {
  lineHeight: '3rem'
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
      type: String,
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
        value.match(/^(primary|secondary|success|warning|danger|dark)$/)
    },
    variant: {
      type: String,
      default: 'solid',
      validator: (value) =>
        value.match(/^(solid|outlined|ghost|flat|link)$/)
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
      validator: (value) => value >= 0
    },
    rounded: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: Boolean,
      default: true
    },
    ...styleProps
  },
  render (h) {
    return h(PseudoBox, {
      props: {
        as: this.as,
        p: '3',
        outline: 'none',
        cursor: 'pointer',
        fontSize: 'md',
        fontWeight: '700',
        border: 'none',
        transition: 'all 0.2s ease-in',
        rounded: 'md',
        _focus: {
          outline: 'none',
          boxShadow: 'outline'
        },
        ...generatedProps
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
    }, this.$slots.default)
  }
}
