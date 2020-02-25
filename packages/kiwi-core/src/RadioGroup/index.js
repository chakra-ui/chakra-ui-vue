import Box from '../Box'
import { baseProps } from '../config'
import { StringNumber } from '../config/props/props.types'
import { useId, cloneVNodeElement } from '../utils'

const RadioGroup = {
  name: 'RadioGroup',
  props: {
    ...baseProps,
    name: {
      type: String,
      default: `radio-${useId()}`
    },
    variantColor: String,
    size: String,
    defaultValue: {
      type: StringNumber,
      default: null
    },
    isInline: Boolean,
    value: StringNumber,
    spacing: {
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      innerValue: this.defaultValue || null
    }
  },
  computed: {
    isControlled () {
      return this.defaultValue != null
    },
    _value: {
      get () {
        return this.isControlled ? this.value : this.innerValue
      },
      set (val) {
        this.innerValue = val
      }
    }
  },
  methods: {
    /**
     * Handles event changes in radio group
     * @param {Event} event Event object
     */
    handleChange (event) {
      if (!this.isControlled) {
        this.innerValue = event.target.value
      }
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
          name: this.name,
          isChecked: vnode.componentOptions.propsData.value === this.value
        },
        on: {
          change: (e) => this.handleChange(e)
        }
      }, h)

      return h(Box, {
        props: {
          display: this.isInline ? 'inline-block' : 'block',
          ...(!isLastRadio && spacingProps)
        }
      }, [clone])
    })

    return h(Box, {
      attrs: {
        role: 'radiogroup'
      },
      ref: 'radioGroup'
    }, clones)
  }
}

export default RadioGroup
