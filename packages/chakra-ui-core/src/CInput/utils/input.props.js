import { SNA, StringArray } from '../../config/props/props.types'

export const inputProps = {
  size: {
    type: SNA,
    default: 'md'
  },
  variant: {
    type: StringArray,
    default: 'outline'
  },
  as: {
    type: String,
    default: 'input'
  },
  _ariaLabel: String,
  _ariaDescribedby: String,
  isFullWidth: {
    type: Boolean,
    default: true
  },
  isReadOnly: Boolean,
  isDisabled: Boolean,
  isInvalid: Boolean,
  isRequired: Boolean,
  focusBorderColor: {
    type: String,
    default: 'blue.400'
  },
  errorBorderColor: {
    type: String,
    default: 'red.300'
  },
  value: {
    type: [String, Number],
    default: undefined
  }
}
