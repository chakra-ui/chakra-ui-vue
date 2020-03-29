import { baseProps } from '../config'
import { formControlProps } from '../CFormControl/utils/formcontrol.props'

import CFlex from '../CFlex'
import CIcon from '../CIcon'
import CText from '../CText'
import { forwardProps } from '../utils'

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
        id: this.formControl.id ? `${this.formControl.id}-error-message` : null
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
