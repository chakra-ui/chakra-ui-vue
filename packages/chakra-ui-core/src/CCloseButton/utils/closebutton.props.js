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
  color: {
    type: String,
    default: 'currentColor'
  },
  ariaLabel: {
    type: String,
    default: 'Close'
  }
}
