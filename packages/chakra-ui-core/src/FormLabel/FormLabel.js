import Box from '../Box'
import { baseProps } from '../config'
import { forwardProps } from '../utils'
import { formControlProps } from '../FormControl/formcontrol.props'

const RequiredIndicator = {
  name: 'RequiredIndicator',
  inject: ['$colorMode'],
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    color () {
      const color = { light: 'red.500', dark: 'red.300' }
      return color[this.colorMode]
    }
  },
  render (h) {
    return h(Box, {
      props: {
        as: 'span',
        ml: 1,
        color: this.color
      },
      attrs: {
        'aria-hidden': true
      }
    }, '*')
  }
}

const FormLabel = {
  name: 'FormLabel',
  inject: ['$useFormControl'],
  props: {
    ...baseProps,
    ...formControlProps
  },
  computed: {
    formControlProps () {
      return {
        isInvalid: this.isInvalid,
        isRequired: this.isRequired,
        isDisabled: this.isDisabled,
        isReadOnly: this.isReadOnly
      }
    },
    formControl () {
      return this.$useFormControl(this.$props)
    }
  },
  render (h) {
    return h(Box, {
      props: {
        as: 'label',
        fontSize: 'md',
        pr: '12px',
        pb: '4px',
        opacity: this.formControl.isDisabled ? '0.4' : '1',
        fontWeight: 'medium',
        textAlign: 'left',
        verticalAlign: 'middle',
        display: 'inline-block',
        ...forwardProps(this.$props)
      }
    }, [
      ...this.$slots.default,
      this.formControl.isRequired && h(RequiredIndicator)
    ])
  }
}

export default FormLabel
