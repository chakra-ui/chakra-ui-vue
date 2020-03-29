import { baseProps } from '../config'
import { forwardProps } from '../utils'
import { formControlProps } from '../CFormControl/utils/formcontrol.props'

import CBox from '../CBox'

const CRequiredIndicator = {
  name: 'CRequiredIndicator',
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
    return h(CBox, {
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
      }
    }, [
      ...this.$slots.default,
      this.formControl.isRequired && h(CRequiredIndicator)
    ])
  }
}

export default CFormLabel
