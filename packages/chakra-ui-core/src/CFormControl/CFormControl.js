import { baseProps } from '../config'
import { forwardProps } from '../utils'
import { formControlProps } from './utils/formcontrol.props'

import CBox from '../CBox'

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
        role: 'group'
      }
    }, this.$slots.default)
  }
}

export default CFormControl
