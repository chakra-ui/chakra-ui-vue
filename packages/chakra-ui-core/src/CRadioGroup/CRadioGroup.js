/**
 * Hey! Welcome to @chakra-ui/vue CRadioGroup
 *
 * CRadioGroup component is a wrapper for it's Radio children
 *
 * @see Docs     https://vue.chakra-ui.com/radio
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CRadioGroup/CRadioGroup.js
 */

import { baseProps } from '../config'
import { StringNumber } from '../config/props/props.types'
import { useId, cloneVNodeElement, forwardProps } from '../utils'

import CBox from '../CBox'

/**
 * CRadioGroup component
 *
 * The group for radio element children
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/radio
 */
const CRadioGroup = {
  name: 'CRadioGroup',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...baseProps,
    name: String,
    variantColor: String,
    size: String,
    isInline: Boolean,
    value: {
      type: StringNumber,
      default: null
    },
    spacing: {
      type: [String, Number],
      default: 2
    },
    as: {
      type: String,
      default: 'fieldset'
    }
  },
  computed: {
    computedName () {
      return this.name || `radio-${useId()}`
    }
  },
  methods: {
    /**
     * Handles event changes in radio group
     * @param {Event} event Event object
     */
    handleChange (event) {
      this.$emit('change', event.target.value)
    },
    /**
     * Focuses the selected option or first enabled option
     */
    focus () {
      const rootRef = this.$refs.radioGroup.$el
      rootRef.focus = () => {
        let input = rootRef.querySelector(
          'input:not(:disabled):checked'
        )

        if (!input) {
          input = rootRef.querySelector('input:not(:disabled)')
        }

        if (input) {
          this.$nextTick(() => {
            input.focus()
          })
        }
      }
    }
  },
  render (h) {
    const children = this.$slots.default

    const clones = children.map((vnode, index) => {
      if (!vnode.tag) return

      const isLastRadio = children.length === index + 1
      const spacingProps = this.isInline ? { mr: this.spacing } : { mb: this.spacing }

      const clone = cloneVNodeElement(vnode, {
        props: {
          size: vnode.componentOptions.propsData.size || this.size,
          variantColor: vnode.componentOptions.propsData.variantColor || this.variantColor,
          name: this.computedName,
          isChecked: vnode.componentOptions.propsData.value === this.value
        },
        on: {
          change: e => this.handleChange(e)
        }
      }, h)

      return h(CBox, {
        props: {
          display: this.isInline ? 'inline-block' : 'block',
          ...(!isLastRadio && spacingProps)
        }
      }, [clone])
    })

    return h(CBox, {
      props: forwardProps(this.$props),
      attrs: {
        role: 'radiogroup',
        'data-chakra-component': 'CRadioGroup'
      },
      ref: 'radioGroup'
    }, clones)
  }
}

export default CRadioGroup
