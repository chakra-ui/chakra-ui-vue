/**
 * Hey! Welcome to @chakra-ui/vue CCheckboxGroup
 *
 * CCheckboxGroup component allows the user to group a
 * related collection of checkboxes in one visual region.
 *
 * @see Docs     https://vue.chakra-ui.com/checkbox
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCheckboxGroup/CCheckboxGroup.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CCheckbox/accessibility.md
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.2/#button
 */

import { SNA } from '../config/props.types'
import { isDef, useId, cleanChildren, cloneVNodeElement, createStyledAttrsMixin } from '../utils'

import CBox from '../CBox'

/**
 * CButtonGroup component
 *
 * Wrapper for children `CCheckbox` components
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/button
 */
const CCheckboxGroup = {
  name: 'CCheckboxGroup',
  mixins: [createStyledAttrsMixin('CCheckboxGroup')],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    name: String,
    variantColor: String,
    size: String,
    defaultValue: Array,
    isInline: Boolean,
    value: Array,
    spacing: {
      type: SNA,
      default: 2
    }
  },
  data () {
    return {
      values: this.defaultValue || []
    }
  },
  computed: {
    isControlled () {
      return isDef(this.value)
    },
    _values () {
      return this.isControlled ? this.value : this.values
    },
    checkboxName () {
      return this.name || `checkbox-group-${useId()}`
    }
  },
  methods: {
    /**
     * Handles change event for checkbox group
     * @param {Event} event Event object
     */
    onChange (val, event) {
      const { checked, value } = event.target
      let newValues
      if (checked) {
        newValues = [...this._values, value]
      } else {
        newValues = this._values.filter(val => val !== value)
      }

      if (!this.isControlled) {
        this.values = newValues
      }
      this.$emit('change', newValues)
    }
  },
  render (h) {
    const children = cleanChildren(this.$slots.default)
    const clones = children.map((vnode, index) => {
      const isLastCheckbox = children.length === index + 1
      const spacingProps = this.isInline ? { mr: this.spacing } : { mb: this.spacing }

      const el = cloneVNodeElement(vnode, {
        props: {
          size: this.size,
          variantColor: this.variantColor,
          name: `${this.checkboxName}-${index}`,
          isChecked: this._values.includes(vnode.componentOptions.propsData.value)
        },
        on: {
          change: this.onChange
        }
      }, h)

      return h(CBox, {
        attrs: {
          display: this.isInline ? 'inline-block' : 'block',
          ...(!isLastCheckbox && spacingProps)
        }
      }, [el])
    })

    return h('div', {
      class: [this.className],
      attrs: {
        ...this.computedAttrs,
        role: 'group'
      }
    }, clones)
  }
}

export default CCheckboxGroup
