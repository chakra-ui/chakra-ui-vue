import Fragment from '../Fragment'
// import Popper from '../Popper'
// import { cloneVNode } from '../utils'
import { baseProps } from '../config/props'

const tooltipProps = {
  label: [String],
  _ariaLabel: String,
  showDelay: {
    type: Number,
    default: 0
  },
  hideDelay: {
    type: Number,
    default: 0
  },
  placement: {
    type: String,
    default: 'auto'
  },
  hasArrow: Boolean,
  closeOnClick: Boolean,
  defaultIsOpen: Boolean,
  shouldWrapChildren: Boolean,
  // todo: create controlledIsOpen functionality
  // controlledIsOpen: Boolean,
  onOpen: Function,
  onClose: Function,
  ...baseProps
}

const Tooltip = {
  inject: ['$colorMode'],
  name: 'Tooltip',
  data () {
    return {
      isOpen: this.defaultIsOpen || false
    }
  },
  computed: {
    colorMode () {
      return this.$colorMode()
    }
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    }
  },
  props: tooltipProps,
  render (h) {
    return h(Fragment, [
      ...this.$slots.children
    ])
  }
}

export default Tooltip
