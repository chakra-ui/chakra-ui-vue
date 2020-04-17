/**
 * Hey! Welcome to @chakra-ui/vue CFormHelperText
 *
 * Used to display helpful hints to the use on how to
 * use an input.
 *
 * @see Docs     https://vue.chakra-ui.com/formcontrol
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CFormHelperText/CFormHelperText.js
 * @see WAI      https://www.w3.org/WAI/tutorials/forms/
 */

import CText from '../CText'
import { baseProps } from '../config'
import { forwardProps } from '../utils'

/**
 * CFormHelperText component
 *
 * Used to display helpful hints to the use on how to
 * use an input.
 *
 * @extends CText
 * @see Docs https://vue.chakra-ui.com/formcontrol
 */
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
        id: this.formControl.id ? `${this.formControl.id}-help-text` : null,
        'data-chakra-component': 'CFormHelperText'
      }
    }, this.$slots.default)
  }
}

export default CFormHelperText
