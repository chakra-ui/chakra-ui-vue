import { baseProps } from '../config'
import { StringNumber } from '../config/props/props.types'
import { useId, cloneVNodeElement, forwardProps } from '../utils'

import CBox from '../CBox'

const CRadioGroup = {
  name: 'CRadioGroup',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...baseProps,
    name: {
      type: String,
      default: `radio-${useId()}`
    },
    variantColor: String,
    size: String,
    isInline: Boolean,
    value: {
      type: StringNumber,
      default: null
    },
    spacing: {
      type: Number,
      default: 2
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
          name: this.name,
          isChecked: vnode.componentOptions.propsData.value === this.value
        },
        on: {
          change: (e) => this.handleChange(e)
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
        role: 'radiogroup'
      },
      ref: 'radioGroup'
    }, clones)
  }
}

export default CRadioGroup
