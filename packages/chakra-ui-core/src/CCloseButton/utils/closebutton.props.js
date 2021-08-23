export default {
  size: {
    type: String,
    default: 'md',
    validator: value => value.match(/^(sm|md|lg)$/)
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  ariaLabel: {
    type: String,
    default: 'Close'
  }
}
