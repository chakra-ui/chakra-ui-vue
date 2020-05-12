/**
 * Hey! Welcome to @chakra-ui/vue CRadio
 *
 * Radios are used when only one choice may be
 * selected in a series of options.
 *
 * @see Docs     https://vue.chakra-ui.com/radio
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CRadio/CRadio.js
 */

import styleProps from '../config/props'
import { useVariantColorWarning, forwardProps } from '../utils'
import useCheckboxStyle from '../CCheckbox/utils/checkbox.styles'
import CBox from '../CBox'
import CVisuallyHidden from '../CVisuallyHidden'
import CControlBox from '../CControlBox'

/**
 * CRadio component
 *
 * The accessible radio component
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/radio
 */
const CRadio = {
  name: 'CRadio',
  model: {
    prop: 'isChecked',
    event: 'checked'
  },
  inject: ['$chakraColorMode', '$chakraTheme'],
  props: {
    ...styleProps,
    id: String,
    name: String,
    value: String,
    ariaLabel: String,
    ariaLabelledBy: String,
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
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
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
  mounted () {
    this.$nextTick(() => {
      this.$emit('checked', Boolean(this.defaultIsChecked))
    })
  },
  render (h) {
    const children = this.$slots.default

    return h(CBox, {
      props: {
        as: 'label',
        display: 'inline-flex',
        verticalAlign: 'top',
        alignItems: 'center',
        width: this.isFullWidth ? 'full' : undefined,
        cursor: this.isDisabled ? 'not-allowed' : 'pointer',
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CRadio'
      },
      domProps: {
        for: this.id
      }
    }, [
      h(CVisuallyHidden, {
        props: {
          as: 'input'
        },
        domProps: {
          checked: this.isChecked,
          value: this.value
        },
        attrs: {
          ...this.$attrs,
          type: 'radio',
          'aria-label': this.ariaLabel,
          'aria-labelledby': this.ariaLabelledBy,
          id: this.id,
          name: this.name,
          'aria-invalid': this.isInvalid,
          disabled: this.isDisabled,
          'aria-disabled': this.isDisabled
        },
        nativeOn: {
          change: (e) => {
            this.$emit('change', e)
            this.$emit('checked', e.target.checked)
          }
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
