import Text from '../Text'
import { baseProps } from '../config'
import { forwardProps } from '../utils'

const FormHelperText = {
  name: 'FormHelperText',
  inject: ['$useFormControl', '$colorMode'],
  props: baseProps,
  computed: {
    formControl () {
      return this.$useFormControl(this.$props)
    },
    colorMode () {
      return this.$colorMode()
    }
  },
  render (h) {
    const color = { light: 'gray.500', dark: 'whiteAlpha.600' }

    return h(Text, {
      props: {
        ...forwardProps(this.$props),
        mt: 2,
        color: color[this.colorMode],
        lineHeight: 'normal',
        fontSize: 'sm'
      },
      attrs: {
        id: this.formControl.id ? `${this.formControl.id}-help-text` : null
      }
    }, this.$slots.default)
  }
}

export default FormHelperText
