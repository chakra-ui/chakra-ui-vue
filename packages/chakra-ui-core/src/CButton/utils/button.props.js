export const buttonProps = {
  as: {
    type: [String, Object],
    default: 'button'
  },
  to: [String, Object],
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'solid',
    validator: value =>
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
    validator: value => value.match(/^(xs|sm|md|lg|xl)$/)
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
  }
}
