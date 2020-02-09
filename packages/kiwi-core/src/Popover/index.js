import Fragment from '../Fragment'
import { Popper } from '../Popper'
import { useId, cloneVNode, getElement } from '../utils'

const Popover = {
  name: 'Popover',
  provide () {
    return {
      $PopoverContext: () => this.PopoverContext
    }
  },
  props: {
    id: {
      type: String,
      default: `popover-id-${useId()}`
    }
  },
  computed: {
    PopoverContext () {
      return {
        isOpen: this.isOpen,
        closePopover: this.closePopover,
        openPopover: this.openPopover,
        toggleOpen: this.toggleOpen,
        triggerNode: this.triggerNode,
        contentNode: this.contentNode,
        setTriggerNode: this.setTriggerNode,
        id: this.id
      }
    }
  },
  data () {
    return {
      isOpen: false,
      triggerNode: undefined,
      contentNode: undefined
    }
  },
  methods: {
    closePopover () {
      this.isOpen = false
    },
    openPopover () {
      this.isOpen = true
    },
    toggleOpen () {
      this.isOpen = !this.isOpen
    },
    /**
     * Sets the trigger node value to reactive context
     * @param {Node} node
     */
    setTriggerNode (node) {
      this.triggerNode = node
    },
    /**
     * Sets the content node value to reactive context
     * @param {Node} node
     */
    setContentNode (node) {
      this.contentNode = node
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

const PopoverTrigger = {
  name: 'PopoverTrigger',
  inject: ['$PopoverContext'],
  computed: {
    triggerId () {
      return `popover-trigger-${useId()}`
    },
    context () {
      return this.$PopoverContext()
    }
  },
  mounted () {
    const { setTriggerNode } = this.context
    this.$nextTick(() => {
      const triggerNode = getElement(`#${this.triggerId}`)
      if (!triggerNode) {
        console.warn('[Chakra-ui]: Unable to locate PopoverTrigger node')
      } else {
        setTriggerNode(triggerNode)
      }
    })
  },
  render (h) {
    let clone
    const children = this.$slots.default
    if (!children) return console.error('[Chakra-ui]: Popover Trigger expects at least one child')
    if (children.length && children.length > 1) return console.error('[Chakra-ui]: Popover Trigger can only have a single child element')
    const cloned = cloneVNode(children[0], h)

    const { toggleOpen } = this.context

    // TODO: Make provision for text node popovers
    clone = h(cloned.componentOptions.Ctor, {
      ...cloned.data,
      ...(cloned.componentOptions.listeners || {}),
      props: {
        ...(cloned.data.props || {}),
        ...cloned.componentOptions.propsData
      },
      attrs: {
        id: this.triggerId
      },
      nativeOn: {
        click: toggleOpen
      }
    }, cloned.componentOptions.children)

    return clone
  }
}

const PopoverContent = {
  name: 'PopoverContent',
  inject: ['$PopoverContext'],
  props: {
    gutter: {
      type: [Number, String],
      default: 4
    },
    usePortal: Boolean,
    placement: {
      type: String,
      default: 'auto'
    }
  },
  computed: {
    contentId () {
      return `popover-content-${useId()}`
    },
    context () {
      return this.$PopoverContext()
    }
  },
  render (h) {
    const { isOpen, triggerNode, id } = this.context
    return h(Popper, {
      props: {
        as: 'section',
        usePortal: this.usePortal,
        isOpen,
        placement: this.placement,
        anchorEl: triggerNode,
        modifiers: { offset: { enabled: true, offset: `0, ${this.gutter}` } },
        _focus: { outline: 0, shadow: 'outline' },
        closeOnClickAway: true
      },
      attrs: {
        id
      }
    }, this.$slots.default)
  }
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent
}
