import styleProps from '../config/props'
import useInputStyle from './utils/input.styles'
import { forwardProps } from '../utils'
import { inputProps } from './utils/input.props'

import CPseudoBox from '../CPseudoBox'

const CInput = {
  name: 'ChakraInput',
  inject: {
    '$chakraColorMode': {
      default: 'light'
    },
    '$chakraTheme': {
      default: () => ({})
    },
    '$useFormControl': {
      default: null
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    ...styleProps,
    ...inputProps
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
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
    }
  },
  methods: {
    emitValue (event) {
      this.$emit('input', event.target.value, event)
      this.$emit('change', event)
    }
  },
  render (h) {
    const inputStyles = useInputStyle({
      ...this.$props,
      theme: this.theme,
      colorMode: this.colorMode
    })

    return h(CPseudoBox, {
      props: {
        ...inputStyles,
        as: this.as,
        fontFamily: 'body',
        ...forwardProps(this.$props)
      },
      domProps: {
        value: this.value
      },
      attrs: {
        'aria-readonly': this.isReadOnly,
        'read-only': this.formControl.isReadOnly,
        disabled: this.formControl.isDisabled,
        'aria-disabled': this.formControl.isDisabled,
        'aria-label': this._ariaLabel,
        'aria-describedby': this._ariaDescribedby,
        'aria-invalid': this.formControl.isInvalid,
        required: this.formControl.isRequired,
        'aria-required': this.formControl.isRequired
      },
      nativeOn: {
        input: this.emitValue
      },
      ref: 'input'
    }, this.$slots.default)
  }
}

export default CInput
