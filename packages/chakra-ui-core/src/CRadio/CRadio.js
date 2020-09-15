/**
 * Hey! Welcome to @chakra-ui/vue CRadio
 *
 * Radios are used when only one choice may be
 * selected in a series of options.
 *
 * @see Docs     https://vue.chakra-ui.com/radio
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CRadio/CRadio.js
 */

import { useVariantColorWarning, createStyledAttrsMixin, useId } from '../utils'
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
  mixins: [createStyledAttrsMixin('CRadio')],
  model: {
    prop: 'isChecked',
    event: 'checked'
  },
  props: {
    id: String,
    name: String,
    value: [String, Number],
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
    radioStyles () {
      useVariantColorWarning(this.theme, 'Radio', this.variantColor)
      return useCheckboxStyle({
        color: this.variantColor,
        size: this.size,
        colorMode: this.colorMode,
        type: 'radio'
      })
    },
    componentStyles () {
      return {
        display: 'inline-flex',
        verticalAlign: 'top',
        alignItems: 'center',
        width: this.isFullWidth ? 'full' : undefined,
        cursor: this.isDisabled ? 'not-allowed' : 'pointer'
      }
    },
    _id () {
      return this.id || `radio-${useId(4)}`
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$emit('checked', Boolean(this.defaultIsChecked))
    })
  },
  render (h) {
    const children = this.$slots.default
    return h('label', {
      class: [this.className],
      attrs: {
        for: this.id,
        ...this.computedAttrs
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
        attrs: {
          ...this.radioStyles,
          rounded: 'full',
          type: 'radio'
        }
      }, [
        h(CBox, {
          props: {
            as: 'span'
          },
          attrs: {
            bg: 'currentColor',
            rounded: 'full',
            w: '50%',
            h: '50%'
          }
        })
      ]),
      children && h(CBox, {
        attrs: {
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
