import { CMenuGroup } from '.'
import { useMenuItemStyle } from './utils/menu.styles'
import styleProps, { baseProps } from '../config/props'
import { forwardProps, useId, cloneVNode } from '../utils'

import CBox from '../CBox'
import CIcon from '../CIcon'
import CPseudoBox from '../CPseudoBox'

const CMenuItemOption = {
  name: 'CMenuItemOption',
  inject: ['$MenuContext', '$chakraTheme', '$chakraColorMode'],
  props: {
    ...styleProps,
    type: String,
    isDisabled: Boolean,
    isChecked: Boolean,
    value: [String, Number]
  },
  computed: {
    context () {
      return this.$MenuContext()
    },
    role () {
      return `menuitem${this.type}`
    },
    menuItemStyles () {
      return props => useMenuItemStyle(props)
    },
    theme () {
      return this.$chakraTheme()
    },
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  methods: {
    /**
     * Handles selection event
     */
    handleSelect (event) {
      const { closeMenu, closeOnSelect } = this.context
      this.$emit('click', event)
      closeOnSelect && closeMenu()
    },
    /**
     * Handles click event on menu option
     * @param {Event} event Click event object
     */
    handleClick (event) {
      if (this.isDisabled) {
        event.stopPropagation()
        event.preventDefault()
        return
      }
      this.handleSelect(event)
    },
    /**
     * Handles keydown events
     * @param {Event} event Keyboard event
     */
    handleKeyDown (event) {
      if (this.isDisabled) return
      if (['Enter', ' '].includes(event.key)) {
        event.preventDefault()
        this.handleSelect(event)
      }

      this.$emit('keydown', event)
    },
    /**
     * Handles mouseenter event
     * @param {Event} event Mouse event object
     */
    handleMouseEnter (event) {
      const { focusableItems, focusAtIndex } = this.context
      if (this.isDisabled) {
        event.stopPropagation()
        event.preventDefault()
        return
      }
      let nextIndex = focusableItems.indexOf(event.currentTarget)
      focusAtIndex(nextIndex)

      this.$emit('mouseenter', event)
    },
    /**
     * Handles mouseleave event
     * @param {Event} event mouse event object
     */
    handleMouseLeave (event) {
      const { focusAtIndex } = this.context
      focusAtIndex(-1)
      this.$emit('mouseleave', event)
    },
    getMenuItemStyles () {
      return useMenuItemStyle({ theme: this.theme, colorMode: this.colorMode })
    }
  },
  render (h) {
    return h(CPseudoBox, {
      props: {
        ...forwardProps(this.$props),
        ...this.getMenuItemStyles(),
        as: 'button',
        display: 'flex',
        minHeight: '32px',
        alignItems: 'center'
      },
      attrs: {
        role: this.role,
        tabIndex: -1,
        'aria-checked': this.isChecked,
        disabled: this.isDisabled,
        'aria-disabled': this.isDisabled
      },
      nativeOn: {
        click: this.handleClick,
        mouseenter: this.handleMouseEnter,
        mouseleave: this.handleMouseLeave,
        keydown: this.handleKeyDown
      }
    }, [
      h(CIcon, {
        props: {
          name: 'check',
          opacity: this.isChecked ? 1 : 0,
          color: 'currentColor',
          size: '1em',
          ml: '1rem',
          mr: '-4px'
        },
        attrs: {
          'aria-hidden': true,
          'data-menuitem-icon': ''
        }
      }),
      h(CBox, {
        props: {
          as: 'span',
          textAlign: 'left',
          flex: '1',
          mx: '1rem'
        }
      }, this.$slots.default)
    ])
  }
}

const CMenuOptionGroup = {
  name: 'CMenuOptionGroup',
  props: {
    ...baseProps,
    type: {
      type: String,
      default: 'radio'
    },
    name: String,
    title: String,
    value: {
      type: [String, Number],
      default: null
    },
    defaultValue: [String, Number]
  },
  data () {
    return {
      innerValue: []
    }
  },
  computed: {
    isControlled () {
      return this.value != null
    },
    computedValue: {
      get () {
        return this.isControlled ? this.value : this.innerValue
      },
      set (value) {
        this.innerValue = value
      }
    },
    fallbackName () {
      return `radio-${useId()}`
    }
  },
  methods: {
    /**
     * Handles change event in menu option group
     * @param {any} value selected value
     */
    handleChange (value) {
      if (this.type === 'radio') {
        if (!this.isControlled) {
          this.computedValue = value
        }
        this.$emit('change', value)
      }

      if (this.type === 'checkbox') {
        let newValue = this.computedValue.includes(value)
          ? this.computedValue.filter(itemValue => itemValue !== value)
          : [...this.computedValue, value]

        if (!this.isControlled) {
          this.computedValue = newValue
        }
        this.$emit('change', newValue)
      }
    }
  },
  render (h) {
    // Check for children nodes
    if (!this.$slots || !this.$slots.default) {
      return h(null)
    } else {
      if (!this.$slots.default.length) {
        return console.error('[Chakra-ui]: <CMenuOptionGroup /> component expects at least one child node.')
      }
    }

    const children = this.$slots.default.filter(e => e.tag)

    const clonedChildNodes = children.map(vnode => {
      let result
      const cloned = cloneVNode(vnode, h)
      if (!cloned.componentOptions) return console.error('Chakra-ui: <CMenuOptionGroup /> component expects valid component as children')

      if (this.type === 'radio') {
        result = h(cloned.componentOptions.Ctor, {
          ...cloned.data,
          props: {
            ...(cloned.data.props || {}),
            ...cloned.componentOptions.propsData,
            type: this.type,
            name: this.name || this.fallbackName,
            isChecked: cloned.componentOptions.propsData['value'] === this.computedValue
          },
          key: cloned.componentOptions.propsData['value'],
          nativeOn: {
            click: (event) => {
              this.handleChange(cloned.componentOptions.propsData['value'])
            },
            keydown: (event) => {
              if (['Enter', ' '].includes(event.key)) {
                event.preventDefault()
                this.handleChange(cloned.componentOptions.propsData['value'])
              }
            }
          }
        }, cloned.componentOptions.children)
      }

      if (this.type === 'checkbox') {
        result = h(cloned.componentOptions.Ctor, {
          ...cloned.data,
          props: {
            ...(cloned.data.props || {}),
            ...cloned.componentOptions.propsData,
            type: this.type,
            isChecked: this.computedValue.includes(cloned.componentOptions.propsData['value'])
          },
          key: cloned.componentOptions.propsData['value'],
          nativeOn: {
            click: (event) => {
              this.handleChange(cloned.componentOptions.propsData['value'])
            },
            keydown: (event) => {
              if (['Enter', ' '].includes(event.key)) {
                event.preventDefault()
                this.handleChange(cloned.componentOptions.propsData['value'])
              }
            }
          }
        }, cloned.componentOptions.children)
      }

      return result
    })

    return h(CMenuGroup, {
      props: {
        ...forwardProps(this.$props),
        title: this.title
      }
    }, clonedChildNodes)
  }
}

export {
  CMenuItemOption,
  CMenuOptionGroup
}
