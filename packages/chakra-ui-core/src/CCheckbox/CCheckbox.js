import { StringNumber, StringArray } from '../config/props/props.types'
import { baseProps } from '../config'
import { useVariantColorWarning, useId } from '../utils'
import useCheckboxStyle from './utils/checkbox.styles'

import CBox from '../CBox'
import CVisuallyHidden from '../CVisuallyHidden'
import CControlBox from '../CControlBox'
import CIcon from '../CIcon'

const CCheckbox = {
  name: 'CCheckbox',
  inject: ['$theme', '$colorMode'],
  model: {
    prop: 'isChecked',
    event: 'change'
  },
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
    isChecked: {
      type: Boolean,
      default: false
    },
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
    },
    _id () {
      return this.id || `checkbox-${useId(4)}`
    }
  },
  created () {
    // Ensure that the use of the variantColor props is consistent with theme.
    useVariantColorWarning(this.theme, 'Checkbox', this.variantColor)
  },
  methods: {
    handleChange (e) {
      this.$emit('change', !this.isChecked, e)
    }
  },
  render (h) {
    const children = this.$slots.default

    return h(CBox, {
      props: {
        ...this.$props,
        as: 'label',
        display: 'inline-flex',
        verticalAlign: 'top',
        alignItems: 'center',
        width: this.isFullWidth ? 'full' : undefined,
        cursor: this.isDisabled ? 'not-allowed' : 'pointer'
      },
      attrs: {
        for: this._id
      }
    }, [
      h(CVisuallyHidden, {
        props: {
          as: 'input'
        },
        domProps: {
          value: this.value,
          defaultChecked: this.isReadOnly ? undefined : this.defaultIsChecked,
          checked:
            this.isReadOnly
              ? this.isChecked
              : this.defaultIsChecked
                ? undefined
                : this.isChecked
        },
        attrs: {
          name: this.name,
          type: 'checkbox',
          id: this._id,
          'aria-label': this.ariaLabel,
          'aria-labelledby': this.ariaLabelledBy,
          disabled: this.isDisabled,
          readOnly: this.isReadOnly,
          'aria-readonly': this.isReadOnly,
          'aria-invalid': this.isInvalid,
          'aria-checked': this.isIndeterminate ? 'mixed' : this.isChecked
        },
        nativeOn: {
          change: this.isReadOnly ? undefined : this.handleChange
        }
      }),
      h(CControlBox, {
        props: {
          opacity: this.isReadOnly ? 0.8 : 1,
          ...this.checkBoxStyles
        }
      }, [
        h(CIcon, {
          props: {
            name: this.isIndeterminate ? 'minus' : 'check',
            size: this.iconSize,
            color: this.iconColor,
            transition: 'transform 240ms, opacity 240ms'
          }
        })
      ]),
      children && h(CBox, {
        props: {
          ml: 2,
          fontSize: this.size,
          fontFamily: 'body',
          userSelect: 'none',
          opacity: this.isDisabled ? 0.4 : 1
        }
      }, children)
    ])
  }
}

export default CCheckbox
