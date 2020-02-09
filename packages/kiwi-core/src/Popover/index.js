import Fragment from '../Fragment'
import { Popper } from '../Popper'
import { useId, cloneVNode, getElement, isVueComponent } from '../utils'

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
    },
    defaultIsOpen: Boolean,
    isOpen: Boolean,
    returnFocusOnClose: {
      type: Boolean,
      default: true
    },
    initialFocusRef: [HTMLElement, Object],
    trigger: {
      type: String,
      default: 'click'
    }
  },
  computed: {
    PopoverContext () {
      return {
        set: this.set,
        isOpen: this._isOpen,
        closePopover: this.closePopover,
        openPopover: this.openPopover,
        toggleOpen: this.toggleOpen,
        triggerNode: this.triggerNode,
        contentNode: this.contentNode,
        setTriggerNode: this.setTriggerNode,
        popoverId: this.id,
        trigger: this.trigger,
        isHovering: this.isHovering
      }
    },
    isControlled () {
      return this.isOpen !== false
    },
    _isOpen: {
      get () {
        return this.isControlled ? this.isOpen : this.isOpenValue
      },
      set (value) {
        this.isOpenValue = value
      }
    },
    _initialFocusRef () {
      return this.getNode(this.initialFocusRef)
    }
  },
  data () {
    return {
      isOpenValue: this.defaultIsOpen || false,
      triggerNode: undefined,
      contentNode: undefined,
      prevIsOpen: false,
      isHovering: false
    }
  },
  mounted () {
    /**
     * The purpose of this watcher is to keep record of the previous
     * isOpen value.
     */
    this.$watch('isOpen', (_newVal, oldVal) => {
      this.prevIsOpen = oldVal
    }, {
      immediate: true
    })

    this.$watch(vm => [
      vm._isOpen,
      vm._initialFocusRef,
      vm.trigger,
      vm.contentNode,
      vm.triggerNode,
      vm.prevIsOpen,
      vm.returnFocusOnClose
    ], () => {
      if (this._isOpen && this.trigger === 'click') {
        requestAnimationFrame(() => {
          if (this._initialFocusRef) {
            this._initialFocusRef.focus()
          } else {
            if (this.contentNode) {
              this.contentNode.focus()
            }
          }
        })
      }

      if (!this._isOpen && this.prevIsOpen && this.trigger === 'click' && this.returnFocusOnClose) {
        if (this.triggerNode) {
          this.triggerNode.focus()
        }
      }
    })
  },
  methods: {
    /**
     * Closes popover
     */
    closePopover () {
      if (!this.isControlled) {
        this._isOpen = false
      }
      this.$emit('close')
    },
    /**
     * Opens popover
     */
    openPopover () {
      if (!this.isControlled) {
        this._isOpen = true
      }
      this.$emit('open')
    },
    /**
     * Toggles disclosure state of popover
     */
    toggleOpen () {
      if (!this.isControlled) {
        this._isOpen = !this._isOpen
      }

      if (this._isOpen !== true) {
        this.$emit('open')
      } else {
        this.$emit('close')
      }
    },
    /**
     * Returns the HTML element of a Vue component or native element
     * @param {Vue.Component|HTMLElement} element HTMLElement or Vue Component
     */
    getNode (element) {
      const isVue = isVueComponent(element)
      return isVue ? element.$el : element
    },
    /**
     * Sets the value of any component instance property.
     * This function is to be passed down to context so that consumers
     * can mutate context values with out doing it directly.
     * Serves as a temporary fix until Vue 3 comes out
     * @param {String} prop Component instance property
     * @param {Any} value Property value
     */
    set (prop, value) {
      this[prop] = value
      return this[prop]
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
    },
    eventHandlers () {
      const { trigger } = this.context

      if (trigger === 'click') {
        return {
          click: (e) => {
            this.$emit('click', e)
            this.context.toggleOpen()
          }
        }
      }

      if (trigger === 'hover') {
        return {
          focus: (e) => {
            this.$emit('focus', e)
            this.context.openPopover()
          },
          keydown: (e) => {
            this.$emit('keydown', e)
            if (e.key === 'Escape') {
              setTimeout(this.context.closePopover(), 300)
            }
          },
          blur: (e) => {
            this.$emit('blur', e)
            this.context.closePopover()
          },
          mouseenter: (e) => {
            this.$emit('mouseenter', e)
            this.context.set('isHovering', true)
            setTimeout(this.context.openPopover(), 300)
          },
          mouseleave: (e) => {
            this.$emit('mouseleave', e)
            this.context.set('isHovering', false)
            setTimeout(() => {
              if (this.context.isHovering === false) {
                this.context.closePopover()
              }
            }, 300)
          }
        }
      }
    }
  },
  mounted () {
    const { set } = this.context
    this.$nextTick(() => {
      const triggerNode = getElement(`#${this.triggerId}`)
      if (!triggerNode) {
        console.warn('[Chakra-ui]: Unable to locate PopoverTrigger node')
      } else {
        set('triggerNode', triggerNode)
      }
    })
  },
  render (h) {
    let clone
    const children = this.$slots.default
    if (!children) return console.error('[Chakra-ui]: Popover Trigger expects at least one child')
    if (children.length && children.length > 1) return console.error('[Chakra-ui]: Popover Trigger can only have a single child element')
    const cloned = cloneVNode(children[0], h)

    const { isOpen, popoverId } = this.context

    // TODO: Make provision for text node popovers
    clone = h(cloned.componentOptions.Ctor, {
      ...cloned.data,
      ...(cloned.componentOptions.listeners || {}),
      props: {
        ...(cloned.data.props || {}),
        ...cloned.componentOptions.propsData
      },
      attrs: {
        id: this.triggerId,
        'aria-haspopup': 'dialog',
        'aria-expanded': isOpen,
        'aria-controls': popoverId
      },
      nativeOn: this.eventHandlers
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
  mounted () {
    const { set, popoverId } = this.context
    this.$nextTick(() => {
      const contentNode = getElement(`#${popoverId}`)
      if (!contentNode) {
        console.warn('[Chakra-ui]: Unable to locate PopoverContent node')
      } else {
        set('contentNode', contentNode)
      }
    })
  },
  render (h) {
    const { isOpen, triggerNode, popoverId } = this.context
    return h(Popper, {
      props: {
        as: 'section',
        usePortal: this.usePortal,
        isOpen,
        placement: this.placement,
        anchorEl: triggerNode,
        modifiers: { offset: { enabled: true, offset: `0, ${this.gutter}` } },
        _focus: { outline: 0, shadow: 'outline' }
        // closeOnClickAway: true
      },
      attrs: {
        id: popoverId
      }
    }, this.$slots.default)
  }
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent
}
