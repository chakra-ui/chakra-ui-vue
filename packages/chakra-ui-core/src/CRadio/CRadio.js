import styleProps from '../config/props'
import { useVariantColorWarning, forwardProps } from '../utils'
import useCheckboxStyle from '../CCheckbox/utils/checkbox.styles'
import CBox from '../CBox'
import CVisuallyHidden from '../CVisuallyHidden'
import CControlBox from '../CControlBox'

const CRadio = {
  name: 'CRadio',
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
    const children = this.$slots.default

    return h(CBox, {
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
      h(CVisuallyHidden, {
        props: {
          as: 'input'
        },
        domProps: {
          defaultChecked: this.defaultIsChecked
        },
        attrs: {
          type: 'radio',
          'aria-label': this._ariaLabel,
          'aria-labelledby': this._ariaLabelledBy,
          id: this.id,
          name: this.name,
          value: this.value,
          'aria-invalid': this.isInvalid,
          disabled: this.isDisabled,
          'aria-disabled': this.isDisabled
        },
        nativeOn: {
          change: (e) => this.$emit('change', e)
        }
      }),
      h(CControlBox, {
        props: {
          ...forwardProps(this.$props),
          ...this.radioStyles,
          rounded: 'full'
        },
        attrs: {
          type: 'radio'
        }
      }, [
        h(CBox, {
          props: {
            as: 'span',
            bg: 'currentColor',
            rounded: 'full',
            w: '50%',
            h: '50%'
          }
        })
      ]),
      children && h(CBox, {
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

export default CRadio
