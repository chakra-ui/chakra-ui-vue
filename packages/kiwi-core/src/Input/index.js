import { NumberStringArray, StringArray } from '../config/props/props.types'
import styleProps from '../config/props'
import PseudoBox from '../PseudoBox'
import useInputStyle from './input.styles'
import { forwardProps } from '../utils'

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
    size: {
      type: NumberStringArray,
      default: 'md'
    },
    variant: {
      type: StringArray,
      default: 'outline'
    },
    as: {
      type: String,
      default: 'input'
    },
    'aria-label': String,
    'aria-describedby': String,
    isFullWidth: {
      type: Boolean,
      default: true
    },
    isReadOnly: Boolean,
    isDisabled: Boolean,
    isInvalid: Boolean,
    isRequired: Boolean,
    focusBorderColor: {
      type: String,
      default: 'blue.400'
    },
    errorBorderColor: {
      type: String,
      default: 'red.300'
    },
    value: {
      type: [String, Number],
      default: undefined
    }
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
      this.$emit('input', event.target.value)
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
        ...forwardProps(this.$props),
        as: this.as,
        ...inputStyles
      },
      attrs: {
        value: this.value
      },
      nativeOn: {
        input: this.emitValue
      },
      ref: 'input'
    })
  }
}

export default Input
