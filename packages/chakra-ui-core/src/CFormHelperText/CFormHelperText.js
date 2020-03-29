import CText from '../CText'
import { baseProps } from '../config'
import { forwardProps } from '../utils'

const CFormHelperText = {
  name: 'CFormHelperText',
  inject: ['$useFormControl', '$chakraColorMode'],
  props: baseProps,
  computed: {
    formControl () {
      return this.$useFormControl(this.$props)
    },
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  render (h) {
    const color = { light: 'gray.500', dark: 'whiteAlpha.600' }

    return h(CText, {
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

export default CFormHelperText
