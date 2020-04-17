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

import { baseProps } from '../config'
import { forwardProps } from '../utils'
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
  inject: ['$chakraColorMode'],
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    color () {
      const color = { light: 'red.500', dark: 'red.300' }
      return color[this.colorMode]
    }
  },
  render (h) {
    return h(CBox, {
      props: {
        as: 'span',
        ml: 1,
        color: this.color
      },
      attrs: {
        'aria-hidden': true,
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
  name: 'CFormLabel',
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
    return h(CBox, {
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
      },
      attrs: {
        'data-chakra-component': 'CFormLabel'
      }
    }, [
      ...this.$slots.default,
      this.formControl.isRequired && h(CRequiredIndicator)
    ])
  }
}

export default CFormLabel
