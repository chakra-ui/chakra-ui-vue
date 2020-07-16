/**
 * Hey! Welcome to @chakra-ui/vue FormControl
 *
 * `CFormControl` provides context such as isInvalid,
 * isDisabled, and isRequired to form elements.
 * This context is used by the following components:
 *
 * - `CFormControl` - Provides context such as `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 * - `CFormLabel` - Label for the Form input
 * - `CFormErrorMessage` - Displays validation message content if it received `isInvalid` from context
 * - `CFormHelperText` - Used to display helpful hints to the use on how to use an input.
 *
 * @see Docs     https://vue.chakra-ui.com/formcontrol
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CFormControl/CFormControl.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CFormControl/accessibility.md
 * @see WAI      https://www.w3.org/WAI/tutorials/forms/
 */

import { createStyledAttrsMixin, useId } from '../utils'
import { formControlProps } from './utils/formcontrol.props'

/**
 * CFormControl component
 *
 * Provides context such as `isInvalid`, `isDisabled`, and `isRequired` to form elements.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/formcontrol
 */
const CFormControl = {
  name: 'CFormControl',
  mixins: [createStyledAttrsMixin('CFormControl')],
  props: {
    ...formControlProps,
    as: {
      type: String,
      default: 'div'
    }
  },
  inject: {
    $FormControlContext: {
      default: null
    }
  },
  computed: {
    formControlContext () {
      if (!this.$FormControlContext) {
        return this.props
      }
      return this.$FormControlContext()
    },
    props () {
      return {
        isInvalid: this.isInvalid,
        isRequired: this.isRequired,
        isDisabled: this.isDisabled,
        isReadOnly: this.isReadOnly,
        id: `fc-${this.computedAttrs.id || useId(3)}`
      }
    }
  },
  provide () {
    return {
      $FormControlContext: () => this.props,
      $useFormControl: this.useFormControl
    }
  },
  methods: {
    useFormControl () {
      /**
       * If a <FormControl /> component is in the ancestor tree,
       * we provide it's values to this components' decendants.
       * However, we give a higher precendence to prop values
       * over context values.
       */
      const context = this.formControlContext
      if (!context) {
        return this.props
      }

      const keys = Object.keys(context)
      return keys.reduce((acc, prop) => {
        // We give precedence to `props` over `context` values
        acc[prop] = this.props[prop]

        if (context) {
          if (this.props[prop] == null) {
            acc[prop] = context[prop]
          }
        }
        return acc
      }, {})
    }
  },
  render (h) {
    return h(this.as, {
      class: [this.className],
      attrs: {
        role: 'group',
        ...this.computedAttrs
      },
      on: this.computedListeners
    }, this.$scopedSlots.default({
      isInvalid: this.isInvalid,
      isRequired: this.isRequired,
      isDisabled: this.isDisabled,
      isReadOnly: this.isReadOnly
    }))
  }
}

export default CFormControl
