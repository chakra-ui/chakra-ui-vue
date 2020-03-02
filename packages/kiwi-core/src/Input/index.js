import styleProps from '../config/props'
import PseudoBox from '../PseudoBox'
import useInputStyle from './input.styles'
import { forwardProps } from '../utils'
import { inputProps } from './input.props'

const Input = {
  // We prefix the input name because we need to compare the
  // VNode names inside InputGroup component
  name: 'CInput',
  inject: {
    '$colorMode': {
      default: 'light'
    },
    '$theme': {
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
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
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

    return h(PseudoBox, {
      props: {
        ...inputStyles,
        as: this.as,
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

export default Input
