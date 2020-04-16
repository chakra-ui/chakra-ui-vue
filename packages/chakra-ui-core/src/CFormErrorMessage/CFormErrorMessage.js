/**
 * Hey! Welcome to @chakra-ui/vue CFormErrorMessage
 *
 * Receives validation information from the `CFormControl`
 * component and displays the validation message
 *
 * @see Docs     https://vue.chakra-ui.com/formcontrol
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CFormErrorMessage/CFormErrorMessage.js
 * @see WAI      https://www.w3.org/WAI/tutorials/forms/
 */

import { baseProps } from '../config'
import { formControlProps } from '../CFormControl/utils/formcontrol.props'

import CFlex from '../CFlex'
import CIcon from '../CIcon'
import CText from '../CText'
import { forwardProps } from '../utils'

/**
 * CFormControl component
 *
 * Displays validation message content if it received
 * `isInvalid` from context
 *
 * @extends CFlex
 * @see Docs https://vue.chakra-ui.com/formcontrol
 */
const CFormErrorMessage = {
  name: 'CFormErrorMessage',
  inject: ['$chakraColorMode', '$useFormControl'],
  props: {
    ...baseProps,
    icon: {
      type: String,
      default: 'warning'
    },
    ...formControlProps
  },
  computed: {
    formControl () {
      return this.$useFormControl(this.$props)
    },
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  render (h) {
    if (!this.formControl.isInvalid) {
      return null
    }

    const color = {
      light: 'red.500',
      dark: 'red.300'
    }

    return h(CFlex, {
      props: {
        color: color[this.colorMode],
        mt: 2,
        fontSize: 'sm',
        align: 'center',
        ...forwardProps(this.$props)
      },
      attrs: {
        id: this.formControl.id ? `${this.formControl.id}-error-message` : null,
        'data-chakra-component': 'CFormErrorMessage'
      }
    }, [
      h(CIcon, {
        props: {
          name: this.icon,
          mr: '0.5em'
        },
        attrs: {
          'aria-hidden': true
        }
      }),
      h(CText, {
        props: {
          lineHeight: 'normal'
        }
      }, this.$slots.default)
    ])
  }
}

export default CFormErrorMessage
