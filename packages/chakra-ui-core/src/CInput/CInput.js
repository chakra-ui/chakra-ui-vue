/**
 * Hey! Welcome to @chakra-ui/vue Input
 *
 * CInput component is a component that is used to get user input in a text field
 *
 * It is usually used together with the FormControl to provide an accessible label, validation messages, etc.
 *
 * @see Docs     https://vue.chakra-ui.com/input
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CInput/CInput.js
 * @see WAI      https://www.w3.org/WAI/tutorials/forms/
 */

import { createStyledAttrsMixin } from '../utils'
import useInputStyle from './utils/input.styles'
import { inputProps } from './utils/input.props'

/**
 * CInput component
 *
 * Gets user input in a text field
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/input
 */
const CInput = {
  mixins: [createStyledAttrsMixin('CInput', true)],
  inject: {
    $chakraColorMode: {
      default: 'light'
    },
    $chakraTheme: {
      default: () => ({})
    },
    $useFormControl: {
      default: null
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: inputProps,
  computed: {
    formControl () {
      if (!this.$useFormControl) {
        return {
          isReadOnly: this.isReadOnly,
          isDisabled: this.isDisabled,
          isInvalid: this.isInvalid,
          isRequired: this.isRequired
        }
      }
      return this.$useFormControl(this.$props)
    },
    inputStyles () {
      return useInputStyle({
        ...this.$props,
        theme: this.theme,
        colorMode: this.colorMode
      })
    },
    componentStyles () {
      return {
        ...this.inputStyles,
        fontFamily: 'body'
      }
    }
  },
  methods: {
    emitValue (event) {
      this.$emit('input', event.target.value, event)
      this.$emit('change', event)
    }
  },
  render (h) {
    return h('input', {
      class: [this.className],
      domProps: {
        value: this.value
      },
      attrs: {
        'aria-readonly': this.isReadOnly,
        readonly: this.formControl.isReadOnly,
        disabled: this.formControl.isDisabled,
        'aria-disabled': this.formControl.isDisabled,
        'aria-invalid': this.formControl.isInvalid,
        required: this.formControl.isRequired,
        'aria-required': this.formControl.isRequired,
        ...this.computedAttrs
      },
      on: {
        ...this.computedListeners,
        input: this.emitValue
      },
      ref: 'input'
    }, this.$slots.default)
  }
}

export default CInput
