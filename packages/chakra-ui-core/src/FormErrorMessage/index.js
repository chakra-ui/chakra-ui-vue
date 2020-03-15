import { baseProps } from '../config'
import { formControlProps } from '../FormControl/formcontrol.props'
import Flex from '../Flex'
import Icon from '../Icon'
import Text from '../Text'
import { forwardProps } from '../utils'

const FormErrorMessage = {
  name: 'FormErrorMessage',
  inject: ['$colorMode', '$useFormControl'],
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
      return this.$colorMode()
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

    return h(Flex, {
      props: {
        ...forwardProps(this.$props),
        color: color[this.colorMode],
        mt: 2,
        fontSize: 'sm',
        align: 'center'
      },
      attrs: {
        id: this.formControl.id ? `${this.formControl.id}-error-message` : null
      }
    }, [
      h(Icon, {
        props: {
          name: this.icon,
          mr: '0.5em'
        },
        attrs: {
          'aria-hidden': true
        }
      }),
      h(Text, {
        props: {
          lineHeight: 'normal'
        }
      }, this.$slots.default)
    ])
  }
}

export default FormErrorMessage
