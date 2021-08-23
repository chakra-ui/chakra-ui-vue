/**
 * Hey! Welcome to @chakra-ui/vue Checkbox
 *
 * CCheckbox component is used in forms when a user needs to select multiple values from several options.
 *
 * @see Docs     https://vue.chakra-ui.com/checkbox
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCheckbox/CCheckbox.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCheckbox/accessibility.md
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#button
 */

import { StringNumber, StringArray } from '../config/props.types'
import { useVariantColorWarning, useId, createStyledAttrsMixin } from '../utils'

import CBox from '../CBox'
import CVisuallyHidden from '../CVisuallyHidden'
import CControlBox from '../CControlBox'
import CIcon from '../CIcon'
import useCheckboxStyle from './utils/checkbox.styles'

/**
 * CCheckbox component
 *
 * Checkbox component is used in forms when a user needs to select multiple values from several options.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/checkbox
 */
const CCheckbox = {
  name: 'CCheckbox',
  mixins: [createStyledAttrsMixin('CCheckbox')],
  model: {
    prop: 'isChecked',
    event: 'change'
  },
  props: {
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
    checkBoxStyles () {
      return useCheckboxStyle({
        color: this.variantColor,
        size: this.size,
        colorMode: this.colorMode
      })
    },
    componentStyles () {
      return {
        display: 'inline-flex',
        verticalAlign: 'top',
        alignItems: 'center',
        width: this.isFullWidth ? 'full' : undefined,
        cursor: this.isDisabled ? 'not-allowed' : 'pointer'
      }
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

    return h('label', {
      class: this.className,
      attrs: {
        for: this._id,
        ...this.computedAttrs
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
        on: {
          change: this.isReadOnly ? undefined : this.handleChange
        }
      }),
      h(CControlBox, {
        attrs: {
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
        attrs: {
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
