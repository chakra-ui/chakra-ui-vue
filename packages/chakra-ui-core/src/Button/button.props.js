export const buttonProps = {
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
  isDisabled: {
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
    default: null
  },
  iconSpacing: {
    type: [String, Number],
    default: '1'
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
  forwardRef: Object
}
