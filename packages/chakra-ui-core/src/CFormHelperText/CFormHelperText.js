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

import { createStyledAttrsMixin } from '../utils'

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
  mixins: [createStyledAttrsMixin('CFormHelperText')],
  inject: ['$useFormControl'],
  computed: {
    formControl () {
      return this.$useFormControl(this.$props)
    },
    componentStyles () {
      const color = { light: 'gray.500', dark: 'whiteAlpha.600' }
      return {
        mt: 2,
        color: color[this.colorMode],
        lineHeight: 'normal',
        fontSize: 'sm'
      }
    }
  },
  render (h) {
    return h(this.as || 'p', {
      class: [this.className],
      attrs: {
        id: this.formControl.id ? `${this.formControl.id}-help-text` : null,
        ...this.computedAttrs
      },
      on: this.computedListeners
    }, this.$slots.default)
  }
}

export default CFormHelperText
