import { baseProps } from '../config'
import Box from '../Box'
import { forwardProps } from '../utils'

const FormControl = {
  name: 'FormControl',
  props: {
    ...baseProps,
    isInvalid: Boolean,
    isRequired: Boolean,
    isDisabled: Boolean,
    isReadOnly: Boolean
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
        isReadOnly: this.isReadOnly
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
    return h(Box, {
      props: forwardProps(this.$props),
      attrs: {
        role: 'group'
      }
    }, this.$slots.default)
  }
}

export default FormControl
