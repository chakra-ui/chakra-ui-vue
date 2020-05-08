import CBox from '../CBox'
import { baseProps } from '../config'
import { StringNumber, SNA } from '../config/props/props.types'
import { isDef, useId, cloneVNodeElement, forwardProps, cleanChildren } from '../utils'

const CRadioButtonGroup = {
  name: 'CRadioButtonGroup',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    ...baseProps,
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
        console.log({ value: props.value, modelValue: _this.value })
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
            tabIndex: getTabIndex()
          },
          nativeOn: {
            click: handleClick
          }
        }, h)
      })
    return h(CBox, {
      props: forwardProps(this.$props),
      attrs: {
        role: 'radiogroup'
      },
      nativeOn: {
        keydown: this.handleKeyDown
      }
    }, clones)
  }
}

export default CRadioButtonGroup
