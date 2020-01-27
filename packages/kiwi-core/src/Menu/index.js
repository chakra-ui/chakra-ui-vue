// eslint-disable-next-line
import { useId, getFocusables, wrapEvent } from '../utils'
import { baseProps } from '../config/props'

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
    }
  },
  props: menuProps,
  data () {
    return {
      isOpen: this.isControlled ? this.controlledIsOpen : this.defaultIsOpen || false,
      activeIndex: this.defaultActiveIndex || -1,
      focusableItems: undefined
    }
  }
}

export {
  Menu
}
