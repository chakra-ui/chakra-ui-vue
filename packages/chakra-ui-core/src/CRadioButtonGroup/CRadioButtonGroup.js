/**
 * Hey! Welcome to @chakra-ui/vue CRadioButtonGroup
 *
 * RadioButtonGroup component provides radio type component
 *
 * @see Docs     https://vue.chakra-ui.com/radio
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CRadioButtonGroup/CRadioButtonGroup.js
 */

import { StringNumber, SNA } from '../config/props.types'
import { isDef, useId, cloneVNodeElement, cleanChildren, createStyledAttrsMixin } from '../utils'

/**
 * CRadioButtonGroup component
 *
 * The group wrapper for radio button children
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/radio
 */
const CRadioButtonGroup = {
  name: 'CRadioButtonGroup',
  mixins: [createStyledAttrsMixin('CRadioButtonGroup')],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    name: String,
    defaultValue: {
      type: StringNumber,
      default: null
    },
    value: StringNumber,
    spacing: {
      type: SNA,
      default: '12px'
    },
    isInline: Boolean
  },
  data () {
    return {
      focusableValues: [],
      allValues: [],
      allNodes: []
    }
  },
  computed: {
    computedName () {
      return this.name || `radiobutton-${useId()}`
    }
  },
  mounted () {
    const children = cleanChildren(this.$slots.default)
    this.focusableValues = children.map(child => child.componentOptions.propsData.isDisabled === true
      ? null
      : child.componentOptions.propsData.value)
      .filter(val => isDef(val))

    this.allValues = children.map(vnode => vnode.componentOptions.propsData.value)

    this.$nextTick(() => {
      const children = this.$el.children
      this.allNodes = Object.assign({}, children)
    })
  },
  methods: {
    /**
     * Updates the current selected index
     * @param {Number} index
     */
    updateIndex (index) {
      const childValue = this.focusableValues[index]
      const _index = this.allValues.indexOf(childValue)
      this.allNodes[_index].focus()
      this.$emit('change', childValue)
    },
    /**
     * Handle keydown event
     * @param {Event} event Event object
     */
    handleKeyDown (event) {
      if (event.key === 'Tab') {
        return
      }

      event.preventDefault()

      const count = this.focusableValues.length
      let enabledCheckedIndex = this.focusableValues.indexOf(this.value)

      if (enabledCheckedIndex === -1) {
        enabledCheckedIndex = 0
      }

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown': {
          let nextIndex
          nextIndex = (enabledCheckedIndex + 1) % count
          if (this.allNodes[nextIndex].disabled) {
            nextIndex = (enabledCheckedIndex + 2) % count
          }
          this.updateIndex(nextIndex)
          break
        }
        case 'ArrowLeft':
        case 'ArrowUp': {
          let nextIndex
          nextIndex = (enabledCheckedIndex - 1 + count) % count
          if (this.allNodes[nextIndex].disabled) {
            nextIndex = (enabledCheckedIndex - 2 + count) % count
          } this.updateIndex(nextIndex)
          break
        }
        default:
          break
      }
    }
  },
  render (h) {
    const children = this.$slots.default
    if (!children) {
      console.warn(`
        [Chakra-ui]: The <RadioButtonGroup> component expects at least one child.
      `)
      return
    }
    const _this = this
    const clones = children
      .filter(vnode => isDef(vnode.tag))
      .map((vnode, index) => {
        const isLastChild = children.length === index + 1
        const isFirstChild = index === 0
        const props = vnode.componentOptions.propsData
        const spacingProps = _this.isInline ? { mr: _this.spacing } : { mb: _this.spacing }

        const isChecked = props.value === _this.value

        const handleClick = () => {
          _this.$emit('change', props.value)
        }

        const getTabIndex = () => {
          // If a RadioGroup has no radio selected the first enabled radio should be focusable
          if (_this.value == null) {
            return isFirstChild ? 0 : -1
          } else {
            return isChecked ? 0 : -1
          }
        }

        return cloneVNodeElement(vnode, {
          props: {
            name: _this.computedName,
            isChecked,
            ...(!isLastChild && spacingProps)
          },
          attrs: {
            tabindex: getTabIndex()
          },
          nativeOn: {
            click: handleClick
          }
        }, h)
      })
    return h('div', {
      class: [this.className],
      attrs: {
        ...this.computedAttrs,
        role: 'radiogroup'
      },
      on: {
        ...this.computedListeners,
        keydown: this.handleKeyDown
      }
    }, clones)
  }
}

export default CRadioButtonGroup
