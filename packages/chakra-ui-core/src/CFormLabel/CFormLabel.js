/**
 * Hey! Welcome to @chakra-ui/vue CFormLabel
 *
 * Label for the Form input
 *
 * @see Docs     https://vue.chakra-ui.com/formcontrol
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CFormLabel/CFormLabel.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CFormLabel/accessibility.md
 * @see WAI      https://www.w3.org/WAI/tutorials/forms/
 */

import { runIfFn, createStyledAttrsMixin } from '../utils'
import { formControlProps } from '../CFormControl/utils/formcontrol.props'

import CBox from '../CBox'

/**
 * CRequiredIndicator component
 *
 * Indicator shown if `isRequired` is received from context.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/formcontrol
 */
const CRequiredIndicator = {
  name: 'CRequiredIndicator',
  functional: true,
  inject: ['$chakraColorMode'],
  render (h, { data, injections, ...rest }) {
    const colorMode = injections.$chakraColorMode()
    const colors = { light: 'red.500', dark: 'red.300' }
    const color = colors[colorMode]

    return h(CBox, {
      ...rest,
      attrs: {
        as: 'span',
        ml: 1,
        color,
        'aria-hidden': true,
        ...data.attrs,
        'data-chakra-component': 'CRequiredIndicator'
      }
    }, '*')
  }
}

/**
 * CFormLabel component
 *
 * Label for the form input.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/formcontrol
 */
const CFormLabel = {
  mixins: [createStyledAttrsMixin('CFormLabel')],
  inject: {
    $useFormControl: {
      default: null
    }
  },
  props: formControlProps,
  computed: {
    formControl () {
      return runIfFn(this.$useFormControl, this.$props)
    },
    componentStyles () {
      return {
        fontSize: 'md',
        pr: '12px',
        pb: '4px',
        opacity: this.formControl.isDisabled ? '0.4' : '1',
        fontWeight: 'medium',
        fontFamily: 'body',
        textAlign: 'left',
        verticalAlign: 'middle',
        display: 'inline-block'
      }
    }
  },
  render (h) {
    return h('label', {
      class: [this.className],
      attrs: this.computedAttrs,
      on: this.computedListeners
    }, [
      ...this.$slots.default,
      this.formControl.isRequired && h(CRequiredIndicator)
    ])
  }
}

export default CFormLabel
