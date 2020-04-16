/**
 * Hey! Welcome to @chakra-ui/vue FormControl
 *
 * `CFormControl` provides context such as isInvalid,
 * isDisabled, and isRequired to form elements.
 * This context is used by the following components:
 *
 * @see Docs     https://vue.chakra-ui.com/formcontrol
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CFormControl/CFormControl.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CFormControl/accessibility.md
 * @see WAI      https://www.w3.org/WAI/tutorials/forms/
 */

import { baseProps } from '../config'
import { forwardProps } from '../utils'
import { formControlProps } from './utils/formcontrol.props'

import CBox from '../CBox'

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
  props: {
    ...baseProps,
    ...formControlProps
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
        id: this.$attrs.id
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
       * If a <FormContext /> in the ancestor tree,
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
    return h(CBox, {
      props: forwardProps(this.$props),
      attrs: {
        role: 'group',
        'data-chakra-component': 'CFormControl'
      }
    }, this.$slots.default)
  }
}

export default CFormControl
