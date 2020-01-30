// eslint-disable-next-line
import { useId, getFocusables, canUseDOM, forwardProps } from '../utils'
import styleProps, { baseProps } from '../config/props'
import Button from '../Button'
import { buttonProps } from '../Button/button.props'
import { useMenuListStyle, useMenuItemStyle } from './menu.styles'
import { Popper } from '../Popper'
import Text from '../Text'
import PseudoBox from '../PseudoBox'
import Fragment from '../Fragment'
import Divider from '../Divider'
import Box from '../Box'

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
  placement: String,
  ...baseProps
}

const Menu = {
  name: 'Menu',
  inject: ['$colorMode', '$theme'],
  provide () {
    return {
      $MenuContext: () => this.MenuContext
    }
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    },
    theme () {
      return this.$theme()
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
  props: menuProps,
  data () {
    return {
      isOpen: this.isControlled ? this.controlledIsOpen : this.defaultIsOpen || false,
      activeIndex: this.defaultActiveIndex || -1,
      focusableItems: null,
      menuNode: undefined,
      buttonNode: undefined
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

    this.$watch('isOpen', (isOpen) => {
      if (isOpen && menuNode) {
        let focusables = getFocusables(menuNode).filter(node =>
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
      if (this.activeIndex === -1 && !this.isOpen /* && wasPreviouslyOpen */) {
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
        let nodeAtIndex = this.focusableItems[index]
        this.focusableItems.forEach(node => {
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
    return h(Fragment, [
      this.$scopedSlots.default({
        isOpen: this.isOpen
      })
    ])
  }
}

const MenuButton = {
  name: 'MenuButton',
  inject: ['$MenuContext'],
  props: {
    ...buttonProps,
    ...styleProps
  },
  computed: {
    context () {
      return this.$MenuContext()
    }
  },
  render (h) {
    const { isOpen, buttonId, menuId, closeMenu, autoSelect, focusOnFirstItem, focusOnLastItem, openMenu } = this.context
    return h(Button, {
      props: {
        ...forwardProps(this.$props),
        isLoading: false
      },
      attrs: {
        id: buttonId,
        role: 'button',
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
        'aria-controls': menuId
      },
      nativeOn: {
        click: (event) => {
          this.$emit('click', event)
          if (isOpen) {
            closeMenu()
          } else {
            if (autoSelect) {
              focusOnFirstItem()
            } else {
              openMenu()
            }
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

const MenuList = {
  name: 'MenuList',
  props: styleProps,
  inject: ['$MenuContext', '$colorMode'],
  computed: {
    context () {
      return this.$MenuContext()
    },
    menuListStyles () {
      return colorMode => useMenuListStyle(colorMode)
    },
    colorMode () {
      return this.$colorMode()
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
        let foundNode = focusableItems.find(item =>
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
    const { isOpen, buttonNode, menuId, buttonId, placement } = this.context
    return h(Popper, {
      props: {
        usePortal: false,
        isOpen,
        anchorEl: buttonNode,
        placement,
        modifiers: {
          preventOverflow: { enabled: true, boundariesElement: 'viewport' }
        },
        closeOnClickAway: true,
        minW: '3xs',
        rounded: 'md',
        py: 2,
        'z-index': 1,
        _focus: {
          outline: 0
        },
        ...this.menuListStyles(this.colorMode),
        ...forwardProps(this.$props)
      },
      attrs: {
        id: menuId,
        role: 'menu',
        'aria-labelledby': buttonId,
        tabIndex: -1
      },
      nativeOn: {
        keydown: this.handleKeyDown,
        blur: this.handleBlur
      }
    }, this.$slots.default)
  }
}

const MenuItem = {
  name: 'MenuItem',
  inject: ['$MenuContext', '$theme', '$colorMode'],
  props: {
    ...styleProps,
    isDisabled: Boolean,
    role: {
      type: String,
      default: 'menuitem'
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
      return this.$theme()
    },
    colorMode () {
      return this.$colorMode()
    }
  },
  render (h) {
    const { focusableItems, focusAtIndex, closeOnSelect, closeMenu } = this.context
    return h(PseudoBox, {
      props: {
        as: 'button',
        display: 'flex',
        textDecoration: 'none',
        color: 'inherit',
        minHeight: '32px',
        alignItems: 'center',
        textAlign: 'left',
        outline: 'none',
        px: 4,
        ...this.menuItemStyles({ theme: this.theme, colorMode: this.colorMode }),
        ...forwardProps(this.$props)
      },
      attrs: {
        role: this.role,
        tabIndex: -1,
        disabled: this.isDisabled,
        'aria-disabled': this.isDisabled
      },
      nativeOn: {
        click: event => {
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
        mouseenter: event => {
          this.$emit('mouseenter', event)
          if (this.isDisabled) {
            event.stopPropagation()
            event.preventDefault()
            return
          }
          if (focusableItems && focusableItems.length > 0) {
            let nextIndex = focusableItems.indexOf(event.currentTarget)
            focusAtIndex(nextIndex)
          }
        },
        mouseleave: () => {
          focusAtIndex(-1)
        },
        keydown: event => {
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

const MenuDivider = {
  name: 'MenuDivider',
  props: baseProps,
  render (h) {
    return h(Divider, {
      props: {
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        ...forwardProps(this.$props)
      }
    })
  }
}

const MenuGroup = {
  name: 'MenuGroup',
  props: {
    title: String,
    ...baseProps
  },
  render (h) {
    return h(Box, {
      attrs: { role: 'group' }
    }, [
      this.title && h(Text, {
        props: { mx: '1', my: 'px', fontWeight: 'semibold', fontSize: 'sm', ...forwardProps(this.$props) }
      }, this.title),
      this.$slots.default
    ])
  }
}

export {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider
}
