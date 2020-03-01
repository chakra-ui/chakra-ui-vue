import { StringNumber, StringArray } from '../config/props/props.types'
import { baseProps } from '../config'
import { useVariantColorWarning } from '../utils'
import useCheckboxStyle from './checkbox.styles'
import Box from '../Box'

const Checkbox = {
  name: 'Checkbox',
  inject: ['$theme', '$colorMode'],
  props: {
    ...baseProps,
    id: String,
    name: String,
    value: [String, Boolean],
    ariaLabel: String,
    ariaLabelledBy: String,
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
    isInvalid: Boolean,
    isReadOnly: Boolean,
    isIndeterminate: Boolean,
    iconColor: StringArray,
    iconSize: {
      type: StringNumber,
      default: '10px'
    }
  },
  computed: {
    theme () {
      return this.$theme()
    },
    colorMode () {
      return this.$colorMode()
    },
    checkBoxStyles () {
      return useCheckboxStyle({
        color: this.variantColor,
        size: this.size,
        colorMode: this.colorMode
      })
    }
  },
  created () {
    // Ensure that the use of the variantColor props is consistent with theme.
    useVariantColorWarning(this.theme, 'Checkbox', this.variantColor)
  },
  render (h) {
    return h(Box, {
      props: {
        ...this.$props,
        as: 'label',
        display: 'inline-flex',
        verticalAlign: 'top',
        alignItems: 'center',
        width: this.isFullWidth ? 'full' : undefined,
        cursor: this.isDisabled ? 'not-allowed' : 'pointer'
      }
    })
  }
}

export default Checkbox
