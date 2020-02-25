import styleProps from '../config/props'
import { useVariantColorWarning, forwardProps } from '../utils'
import useCheckboxStyle from '../Checkbox/checkbox.styles'
import Box from '../Box'
import VisuallyHidden from '../VisuallyHidden'
import ControlBox from '../ControlBox'

const Radio = {
  name: 'Radio',
  inject: ['$colorMode', '$theme'],
  props: {
    ...styleProps,
    id: String,
    name: String,
    value: String,
    _ariaLabel: String,
    _ariaLabelledBy: String,
    variantColor: {
      type: String,
      default: 'blue'
    },
    defaultIsChecked: Boolean,
    isChecked: Boolean,
    isFullWidth: Boolean,
    size: {
      type: String,
      default: 'md'
    },
    isDisabled: Boolean,
    isInvalid: Boolean
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
    },
    radioStyles () {
      useVariantColorWarning(this.theme, 'Radio', this.variantColor)
      return useCheckboxStyle({
        color: this.variantColor,
        size: this.size,
        colorMode: this.colorMode,
        type: 'radio'
      })
    }
  },
  render (h) {
    const children = this.$slots.default.filter(e => (e.tag || e.text))

    return h(Box, {
      props: {
        ...forwardProps(this.$props),
        as: 'label',
        display: 'inline-flex',
        verticalAlign: 'top',
        alignItems: 'center',
        width: this.isFullWidth ? 'full' : undefined,
        cursor: this.isDisabled ? 'not-allowed' : 'pointer'
      },
      attrs: {
        for: this.id
      }
    }, [
      h(VisuallyHidden, {
        props: {
          as: 'input'
        },
        attrs: {
          type: 'radio',
          'aria-label': this._ariaLabel,
          'aria-labelledby': this._ariaLabelledBy,
          id: this.id,
          name: this.name,
          value: this.value,
          'aria-invalid': this.isInvalid,
          defaultChecked: this.defaultIsChecked,
          disabled: this.isDisabled,
          'aria-disabled': this.isDisabled
        }
      }),
      h(ControlBox, {
        props: {
          ...forwardProps(this.$props),
          ...this.radioStyles,
          rounded: 'full'
        },
        attrs: {
          type: 'radio'
        }
      }, [
        h(Box, {
          props: {
            as: 'span',
            bg: 'currentColor',
            rounded: 'full',
            w: '50%',
            h: '50%'
          }
        })
      ]),
      ...children && h(Box, {
        props: {
          ml: 2,
          fontSize: this.size,
          fontFamily: 'body',
          userSelect: 'none',
          opacity: this.isDisabled ? 0.32 : 1
        }
      }, children)
    ])
  }
}

export default Radio
