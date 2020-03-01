import { NumberStringArray } from '../config/props/props.types'
import { baseProps } from '../config'
import Box from '../Box'
import { isDef, useId, cleanChildren, cloneVNodeElement, forwardProps } from '../utils'

const CheckboxGroup = {
  name: 'CheckboxGroup',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...baseProps,
    name: String,
    variantColor: String,
    size: String,
    defaultValue: Array,
    isInline: Boolean,
    value: Array,
    spacing: {
      type: NumberStringArray,
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
    _name () {
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
          name: `${this.name}-${index}`,
          isChecked: this._values.includes(vnode.componentOptions.propsData.value)
        },
        on: {
          change: this.onChange
        }
      }, h)

      return h(Box, {
        props: {
          display: this.isInline ? 'inline-block' : 'block',
          ...(!isLastCheckbox && spacingProps)
        }
      }, [el])
    })

    return h(Box, {
      props: forwardProps(this.$props),
      attrs: {
        role: 'group'
      }
    }, clones)
  }
}

export default CheckboxGroup
