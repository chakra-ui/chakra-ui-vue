import styleProps from '../config/props'

const Radio = {
  name: 'Radio',
  props: {
    ...styleProps,
    id: String,
    name: String,
    value: String,
    _ariaLabel: String,
    _ariaLabelledBy: String,
    variantColor: {
      type: String,
      default: 'blue'
    },
    defaultIsChecked: Boolean,
    isChecked: Boolean,
    isFullWidth: Boolean,
    size: {
      type: String,
      default: 'md'
    },
    isDisabled: Boolean,
    isInvalid: Boolean
  }
}

export default Radio
