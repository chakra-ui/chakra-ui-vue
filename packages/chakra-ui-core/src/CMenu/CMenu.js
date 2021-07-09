/**
 * Hey! Welcome to @chakra-ui/vue Menu
 *
 * `CMenu` is An accessible dropdown menu for the common dropdown menu button design pattern.
 *
 * @see Docs     https://vue.chakra-ui.com/menu
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CMenu/CMenu.js
 */

import { useId, getFocusables, canUseDOM, forwardProps } from '../utils'
import { buttonProps } from '../CButton/utils/button.props'

import { CPopper } from '../CPopper'
import CButton from '../CButton'
import CText from '../CText'
import CPseudoBox from '../CPseudoBox'
import CFragment from '../CFragment'
import CDivider from '../CDivider'
import { useMenuListStyle, useMenuItemStyle } from './utils/menu.styles'

const menuProps = {
  controlledIsOpen: Boolean,
  isControlled: Boolean,
  defaultIsOpen: Boolean,
  onOpen: Function,
  onClose: Function,
  autoSelect: {
    type: Boolean,
    default: true
  },
  closeOnBlur: {
    type: Boolean,
    default: true
  },
  closeOnSelect: {
    type: Boolean,
    default: true
  },
  defaultActiveIndex: Number,
  placement: String
}

/**
 * CMenu component
 *
 * The menu container element
 *
 * @see Docs https://vue.chakra-ui.com/menu
 */
const CMenu = {
  name: 'CMenu',
  inject: ['$chakraColorMode', '$chakraTheme'],
  provide () {
    return {
      $MenuContext: () => this.MenuContext
    }
  },
  props: menuProps,
  data () {
    return {
      isOpen: this.isControlled ? this.controlledIsOpen : this.defaultIsOpen || false,
      activeIndex: this.defaultActiveIndex || -1,
      focusableItems: null,
      menuNode: undefined,
      buttonNode: undefined,
      prevIsOpen: undefined
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    theme () {
      return this.$chakraTheme()
    },
    menuId () {
      return `menu-${useId()}`
    },
    buttonId () {
      return `menubutton-${useId()}`
    },
    MenuContext () {
      return {
        activeIndex: this.activeIndex,
        isOpen: this.isOpen,
        menuNode: this.menuNode,
        buttonNode: this.buttonNode,
        focusableItems: this.focusableItems,
        placement: this.placement,
        menuId: this.menuId,
        buttonId: this.buttonId,
        colorMode: this.colorMode,
        focusAtIndex: this.focusAtIndex,
        focusOnLastItem: this.focusOnLastItem,
        focusOnFirstItem: this.focusOnFirstItem,
        closeMenu: this.closeMenu,
        autoSelect: this.autoSelect,
        closeOnSelect: this.closeOnSelect,
        closeOnBlur: this.closeOnBlur
      }
    }
  },
  mounted () {
    let menuNode
    let buttonNode
    this.$nextTick(() => {
      // In child components bind menuId to menuNode and bind it
      menuNode = canUseDOM && document.querySelector(`#${this.menuId}`)
      this.menuNode = menuNode

      buttonNode = canUseDOM && document.querySelector(`#${this.buttonId}`)
      this.buttonNode = buttonNode
    })

    this.$watch('isOpen', (_newVal, oldVal) => {
      this.prevIsOpen = oldVal
    }, {
      immediate: true
    })

    this.$watch('isOpen', (isOpen) => {
      if (isOpen && menuNode) {
        const focusables = getFocusables(menuNode).filter(node =>
          ['menuitem', 'menuitemradio', 'menuitemcheckbox'].includes(
            node.getAttribute('role')
          )
        )
        this.focusableItems = menuNode ? focusables : []
        this.initTabIndex()
      }
    })

    this.$watch(vm => [vm.activeIndex, vm.isOpen, vm.menuNode, vm.buttonNode], () => {
      if (this.activeIndex !== -1) {
        this.focusableItems[this.activeIndex] &&
          this.focusableItems[this.activeIndex].focus()
        this.updateTabIndex(this.activeIndex)
      }
      if (this.activeIndex === -1 && !this.isOpen && this.prevIsOpen) {
        this.buttonNode && this.buttonNode.focus()
      }
      if (this.activeIndex === -1 && this.isOpen) {
        this.menuNode && this.menuNode.focus()
      }
    })
  },
  methods: {
    /**
     * Initializes tab indexing on menu list items
     */
    initTabIndex () {
      this.focusableItems.forEach(
        (node, index) => index === 0 && node.setAttribute('tabindex', 0)
      )
    },
    /**
     * Updates tab index for menulist items
     * @param {Number} index Position index of menu list item
     */
    updateTabIndex (index) {
      if (this.focusableItems.length > 0) {
        const nodeAtIndex = this.focusableItems[index]
        this.focusableItems.forEach((node) => {
          if (node !== nodeAtIndex) {
            node.setAttribute('tabindex', -1)
          }
        })
        nodeAtIndex.setAttribute('tabindex', 0)
      }
    },
    /**
     * Resets tab index of menu list items
     */
    resetTabIndex () {
      if (this.focusableItems) {
        this.focusableItems.forEach(node => node.setAttribute('tabindex', -1))
      }
    },
    /**
     * Opens Menu component
     */
    openMenu () {
      if (!this.isControlled) {
        this.isOpen = true
      }

      if (this.onOpen) {
        this.onOpen()
      }
    },
    /**
     * Focuses first menulist element.
     */
    focusOnFirstItem () {
      this.openMenu()
      this.activeIndex = 0
    },
    /**
     * Focuses an element at a particular index
     * @param {Number} index Menulist items index
     */
    focusAtIndex (index) {
      this.activeIndex = index
    },
    /**
     * Focuses last menulist item
     */
    focusOnLastItem () {
      this.openMenu()
      this.activeIndex = this.focusableItems.length - 1
    },
    /**
     * Closes Menu
     */
    closeMenu () {
      if (!this.isControlled) {
        this.isOpen = false
      }

      if (this.onClose) {
        this.onClose()
      }

      this.activeIndex = -1
      this.resetTabIndex()
    }
  },
  render (h) {
    return h(CFragment, {
      attrs: {
        'data-chakra-component': 'CMenu'
      }
    }, [
      this.$scopedSlots.default({
        isOpen: this.isOpen
      })
    ])
  }
}

/**
 * CMenuButton component
 *
 * The menu button element
 *
 * @see Docs https://vue.chakra-ui.com/menu
 */
const CMenuButton = {
  name: 'CMenuButton',
  inheritAttrs: false,
  inject: ['$MenuContext'],
  props: buttonProps,
  computed: {
    context () {
      return this.$MenuContext()
    }
  },
  render (h) {
    const { isOpen, buttonId, menuId, closeMenu, autoSelect, focusOnFirstItem, focusOnLastItem, openMenu } = this.context
    return h(CButton, {
      props: {
        ...forwardProps(this.$props),
        isLoading: false
      },
      attrs: {
        id: buttonId,
        role: 'button',
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
        'aria-controls': menuId,
        'data-chakra-component': 'CMenuButton',
        ...this.$attrs
      },
      nativeOn: {
        click: (event) => {
          this.$emit('click', event)
          if (isOpen) {
            closeMenu()
          } else if (autoSelect) {
            focusOnFirstItem()
          } else {
            openMenu()
          }
        },
        keydown: (event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            focusOnFirstItem()
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault()
            focusOnLastItem()
          }
        }
      }
    }, this.$slots.default)
  }
}

/**
 * CMenuList component
 *
 * The menu list element
 *
 * @extends CPopper
 * @see Docs https://vue.chakra-ui.com/menu
 */
const CMenuList = {
  name: 'CMenuList',
  inheritAttrs: false,
  inject: ['$MenuContext', '$chakraColorMode'],
  computed: {
    context () {
      return this.$MenuContext()
    },
    menuListStyles () {
      return colorMode => useMenuListStyle(colorMode)
    },
    colorMode () {
      return this.$chakraColorMode()
    }
  },
  props: {
    placement: {
      type: String,
      validator: value => value.match(
        /^(top|top-start|top-end|right|right-start|right-end|bottom|bottom-start|bottom-end|left|left-start|left-end)$/
      )
    }
  },
  methods: {
    handleKeyDown (event) {
      const { activeIndex: index, focusAtIndex, focusOnFirstItem, focusOnLastItem, closeMenu, focusableItems } = this.context
      const count = focusableItems.length
      let nextIndex
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        nextIndex = (index + 1) % count
        focusAtIndex(nextIndex)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        nextIndex = (index - 1 + count) % count
        focusAtIndex(nextIndex)
      } else if (event.key === 'Home') {
        focusOnFirstItem()
      } else if (event.key === 'End') {
        focusOnLastItem()
      } else if (event.key === 'Tab') {
        event.preventDefault()
      } else if (event.key === 'Escape') {
        closeMenu()
      }

      // Set focus based on first character
      if (/^[a-z0-9_-]$/i.test(event.key)) {
        event.stopPropagation()
        event.preventDefault()
        const foundNode = focusableItems.find(item =>
          item.textContent.toLowerCase().startsWith(event.key)
        )
        if (foundNode) {
          nextIndex = focusableItems.indexOf(foundNode)
          focusAtIndex(nextIndex)
        }
      }

      this.$emit('keydown', event)
    },
    handleBlur (event) {
      const { menuNode, buttonNode, isOpen, closeOnBlur, closeMenu } = this.context
      if (
        closeOnBlur &&
        isOpen &&
        menuNode &&
        buttonNode &&
        !menuNode.contains(event.relatedTarget) &&
        !buttonNode.contains(event.relatedTarget)
      ) {
        closeMenu()
      }

      this.$emit('blur', event)
    }
  },
  render (h) {
    const { isOpen, buttonNode, menuId, buttonId, placement, closeMenu, closeOnBlur } = this.context
    return h(CPopper, {
      props: {
        usePortal: false,
        isOpen,
        anchorEl: buttonNode,
        placement: this.placement || placement,
        modifiers: [
          {
            name: 'preventOverflow',
            options: {
              rootBoundary: 'viewport'
            }
          }
        ],
        closeOnClickAway: closeOnBlur,
        hasArrow: false
      },
      attrs: {
        minW: '3xs',
        rounded: 'md',
        py: 2,
        'z-index': 1,
        _focus: {
          outline: 0
        },
        ...this.menuListStyles(this.colorMode),
        ...this.$attrs,
        id: menuId,
        role: 'menu',
        'aria-labelledby': buttonId,
        tabindex: -1,
        'data-chakra-component': 'CMenuButton'
      },
      on: {
        close: closeMenu
      },
      nativeOn: {
        keydown: this.handleKeyDown,
        blur: this.handleBlur
      }
    }, this.$slots.default)
  }
}

/**
 * CMenuItem component
 *
 * The menu list item element
 *
 * @extends CPseudoBox
 * @see Docs https://vue.chakra-ui.com/menu
 */
const CMenuItem = {
  name: 'CMenuItem',
  inheritAttrs: false,
  inject: ['$MenuContext', '$chakraTheme', '$chakraColorMode'],
  props: {
    isDisabled: Boolean,
    role: {
      type: String,
      default: 'menuitem'
    },
    as: {
      type: [String, Object],
      default: 'button'
    }
  },
  computed: {
    context () {
      return this.$MenuContext()
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
  render (h) {
    const { focusableItems, focusAtIndex, closeOnSelect, closeMenu } = this.context
    return h(CPseudoBox, {
      props: {
        as: this.as
      },
      attrs: {
        display: 'flex',
        textDecoration: 'none',
        color: 'inherit',
        minHeight: '32px',
        alignItems: 'center',
        textAlign: 'left',
        outline: 'none',
        px: 4,
        ...this.menuItemStyles({ theme: this.theme, colorMode: this.colorMode }),
        ...this.$attrs,
        role: this.role,
        tabindex: -1,
        disabled: this.isDisabled,
        'aria-disabled': this.isDisabled,
        'data-chakra-component': 'CMenuItem'
      },
      nativeOn: {
        click: (event) => {
          this.$emit('click', event)
          if (this.isDisabled) {
            event.stopPropagation()
            event.preventDefault()
            return
          }
          if (closeOnSelect) {
            closeMenu()
          }
        },
        mouseenter: (event) => {
          this.$emit('mouseenter', event)
          if (this.isDisabled) {
            event.stopPropagation()
            event.preventDefault()
            return
          }
          if (focusableItems && focusableItems.length > 0) {
            const nextIndex = focusableItems.indexOf(event.currentTarget)
            focusAtIndex(nextIndex)
          }
        },
        mouseleave: () => {
          focusAtIndex(-1)
        },
        keydown: (event) => {
          this.$emit('keydown', event)
          if (this.isDisabled) return
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()

            // We also emit click event to simulate click event for keyboard "Enter" keydown event
            this.$emit('click')

            if (closeOnSelect) {
              closeMenu()
            }
          }
        }
      }
    }, this.$slots.default)
  }
}

/**
 * CMenuDivider component
 *
 * The menu list divider element
 *
 * @see Docs https://vue.chakra-ui.com/menu
 */
const CMenuDivider = {
  name: 'CMenuDivider',
  functional: true,
  render (h, { data, ...rest }) {
    return h(CDivider, {
      ...rest,
      attrs: {
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        ...data.attrs,
        'data-chakra-component': 'CMenuDivider'
      }
    })
  }
}

/**
 * CMenuGroup component
 *
 * The menu list item group.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/menu
 */
const CMenuGroup = {
  name: 'CMenuGroup',
  functional: true,
  props: {
    title: String
  },
  render (h, { props, slots, data }) {
    return h('div', {
      attrs: {
        role: 'group',
        'data-chakra-component': 'CMenuGroup'
      }
    }, [
      props.title && h(CText, {
        attrs: { mx: 4, my: 2, fontWeight: 'semibold', fontSize: 'sm', ...data.attrs }
      }, props.title),
      slots().default
    ])
  }
}

export {
  CMenu,
  CMenuButton,
  CMenuList,
  CMenuItem,
  CMenuGroup,
  CMenuDivider
}
