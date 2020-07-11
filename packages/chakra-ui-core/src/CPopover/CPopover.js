/**
 * Hey! Welcome to @chakra-ui/vue Popover
 *
 * Popover is a non-modal dialog that floats around a trigger. It's used to display contextual information to the user.
 *
 * @see Docs     https://vue.chakra-ui.com/popover
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CPopover/CPopover.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CPopover/accessibility.md
 */

import { isFunction } from 'lodash-es'
import { useId, cloneVNode, getElement, isVueComponent, createStyledAttrsMixin } from '../utils'

import CBox from '../CBox'
import CCloseButton from '../CCloseButton'
import CFragment from '../CFragment'
import { CPopper, CPopperArrow } from '../CPopper'

/**
 * CPopover component
 *
 * The wrapper that provides props, state, and context to it's children
 *
 * @extends CFlex
 * @see Docs https://vue.chakra-ui.com/popover
 */
const CPopover = {
  name: 'CPopover',
  provide () {
    return {
      $PopoverContext: () => this.PopoverContext
    }
  },
  props: {
    id: String,
    defaultIsOpen: Boolean,
    isOpen: Boolean,
    returnFocusOnClose: {
      type: Boolean,
      default: true
    },
    initialFocusRef: [Object, String, Function],
    trigger: {
      type: String,
      default: 'click'
    },
    closeOnBlur: {
      type: Boolean,
      default: true
    },
    closeOnEscape: {
      type: Boolean,
      default: true
    },
    usePortal: Boolean,
    placement: {
      type: String,
      default: 'auto'
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
        popoverId: this.computedId,
        trigger: this.trigger,
        isHovering: this.isHovering,
        handleBlur: this.handleBlur,
        closeOnEscape: this.closeOnEscape,
        headerId: this.headerId,
        bodyId: this.bodyId,
        usePortal: this.usePortal,
        placement: this.placement
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
      return isFunction(this.initialFocusRef)
        ? this.getNode(this.initialFocusRef())
        : this.getNode(this.initialFocusRef)
    },
    headerId () {
      return `${this.computedId}-header`
    },
    bodyId () {
      return `${this.computedId}-body`
    },
    computedId () {
      return this.id || `popover-id-${useId()}`
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
    this.$watch('_isOpen', (_newVal, oldVal) => {
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
        /**
         * Caveat here:
         * Until Vue 3 is release, using it's $refs as props may not always return a value
         * in the props unless the consumer component updates it's context. This is because
         * Vue asynchronously updtaes the DOM and is also not reactive.
         *
         * Where this doesnt' work, we fallback to using an element selector to query
         * the element from the DOM. And use it as the initial focus ref.
         *
         * Work-around could be to use plain old JS selectors
         */
        setTimeout(() => {
          if (this._initialFocusRef) {
            this._initialFocusRef.focus()
          } else if (this.contentNode) {
            this.contentNode.focus()
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
     * Handles blur event
     * @param {Event} e `blur` event object
     */
    handleBlur (event) {
      if (
        this._isOpen &&
        this.closeOnBlur &&
        this.contentNode &&
        this.triggerNode &&
        !this.contentNode.contains(event.relatedTarget) &&
        !this.triggerNode.contains(event.relatedTarget)
      ) {
        this.closePopover()
      }
    },
    /**
     * Returns the HTML element of a Vue component or native element
     * @param {Vue.Component|HTMLElement|String} element HTMLElement or Vue Component
     */
    getNode (element) {
      if (typeof element === 'object') {
        const isVue = isVueComponent(element)
        return isVue ? element.$el : element
      } else if (typeof element === 'string') {
        return getElement(element)
      }
      return null
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
    return h(CFragment, {
      attrs: {
        'data-chakra-component': 'CPopover'
      }
    }, [
      this.$scopedSlots.default({
        isOpen: this._isOpen,
        onClose: this.closePopover
      })
    ])
  }
}

/**
 * CPopoverTrigger component
 *
 * Used to wrap the reference (or trigger) element.
 *
 * @extends this.$slots.default
 * @see Docs https://vue.chakra-ui.com/popover
 */
const CPopoverTrigger = {
  name: 'CPopoverTrigger',
  inheritAttrs: false,
  inject: ['$PopoverContext'],
  computed: {
    triggerId () {
      return `popover-trigger-${useId()}`
    },
    context () {
      return this.$PopoverContext()
    },
    headerId () {
      return this.context.headerId
    },
    bodyId () {
      return this.context.bodyId
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
    const children = this.$slots.default.filter(e => e.tag)
    if (!children) return console.error('[Chakra-ui]: Popover Trigger expects at least one child')
    if (children.length && children.length > 1) return console.error('[Chakra-ui]: Popover Trigger can only have a single child element')
    const cloned = cloneVNode(children[0], h)

    const { isOpen, popoverId } = this.context

    const clone = h(cloned.componentOptions.Ctor, {
      ...cloned.data,
      ...(cloned.componentOptions.listeners || {}),
      props: {
        ...(cloned.data.props || {}),
        ...cloned.componentOptions.propsData
      },
      attrs: {
        ...cloned.data.attrs,
        ...this.$attrs,
        id: this.triggerId,
        'aria-haspopup': 'dialog',
        'aria-expanded': isOpen,
        'aria-controls': popoverId,
        'data-chakra-component': 'CPopoverTrigger'
      },
      nativeOn: this.eventHandlers
    }, cloned.componentOptions.children)

    return clone
  }
}

/**
 * CPopoverContent component
 *
 * The popover content element itself.
 *
 * @extends CPopper
 * @see Docs https://vue.chakra-ui.com/popover
 */
const CPopoverContent = {
  name: 'CPopoverContent',
  inheritAttrs: false,
  inject: ['$PopoverContext', '$chakraColorMode'],
  props: {
    gutter: {
      type: [Number, String],
      default: 4
    },
    ariaLabel: String
  },
  computed: {
    context () {
      return this.$PopoverContext()
    },
    contentId () {
      return `popover-content-${useId()}`
    },
    colorMode () {
      return this.$chakraColorMode()
    },
    eventHandlers () {
      const { trigger, handleBlur, closePopover, closeOnEscape } = this.context

      let eventHandlers = {}

      if (trigger === 'click') {
        eventHandlers = {
          blur: (e) => {
            this.$emit('blur', e)
            handleBlur(e)
          }
        }
      }

      if (trigger === 'hover') {
        eventHandlers = {
          ...eventHandlers,
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

      eventHandlers = {
        ...eventHandlers,
        keydown: (e) => {
          this.$emit('keydown', e)
          if (e.key === 'Escape' && closeOnEscape) {
            closePopover && closePopover()
          }
        }
      }

      return eventHandlers
    },
    calculatedAttrs () {
      const { trigger } = this.context
      if (trigger === 'click') {
        return {
          role: 'dialog',
          'aria-modal': 'false'
        }
      }

      if (trigger === 'hover') {
        return {
          role: 'tooltip'
        }
      }
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
    const { isOpen, triggerNode, popoverId, usePortal, placement } = this.context
    const bg = this.colorMode === 'light' ? 'white' : 'gray.700'

    return h(CPopper, {
      props: {
        as: 'section',
        usePortal,
        isOpen,
        placement,
        anchorEl: triggerNode,
        modifiers: [{
          name: 'offset',
          options: {
            offset: [0, this.gutter]
          }
        }]
      },
      attrs: {
        bg,
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        rounded: 'md',
        shadow: 'sm',
        maxWidth: 'xs',
        _focus: { outline: 0, shadow: 'outline' },
        ...this.$attrs,
        id: popoverId,
        tabIndex: -1,
        'aria-labelledby': this.headerId,
        'aria-describedby': this.bodyId,
        'aria-label': this.ariaLabel,
        'aria-hidden': !isOpen,
        ...this.calculatedAttrs,
        'data-chakra-component': 'CPopoverContent'
      },
      nativeOn: this.eventHandlers
    }, this.$slots.default)
  }
}

/**
 * CPopoverHeader component
 *
 * The header of the popover.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/popover
 */
const CPopoverHeader = {
  mixins: [createStyledAttrsMixin('CPopoverHeader')],
  inject: ['$PopoverContext'],
  computed: {
    context () {
      return this.$PopoverContext()
    },
    headerId () {
      return this.context.headerId
    },
    componentStyles () {
      return {
        px: '0.75rem',
        py: '0.5rem',
        borderBottomWidth: '1px'
      }
    }
  },
  render (h) {
    return h('header', {
      class: [this.className],
      attrs: {
        ...this.computedAttrs,
        id: this.headerId,
        'data-chakra-component': 'CPopoverHeader'
      },
      on: this.computedListeners
    }, this.$slots.default)
  }
}

/**
 * CPopoverBody component
 *
 * The body of the popover.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/popover
 */
const CPopoverBody = {
  mixins: [createStyledAttrsMixin('CPopoverBody')],
  inject: ['$PopoverContext'],
  computed: {
    context () {
      return this.$PopoverContext()
    },
    bodyId () {
      return this.context.bodyId
    },
    componentStyles () {
      return {
        flex: 1,
        px: '0.75rem',
        py: '0.5rem'
      }
    }
  },
  render (h) {
    return h(this.as || 'div', {
      class: [this.className],
      attrs: {
        ...this.computedAttrs,
        id: this.bodyId,
        'data-chakra-component': 'CPopoverBody'
      },
      on: this.computedListeners
    }, this.$slots.default)
  }
}

/**
 * CPopoverArrow component
 *
 * A visual arrow that points to the reference (or trigger).
 *
 * @extends CPopperArrow
 * @see Docs https://vue.chakra-ui.com/popover
 */
const CPopoverArrow = {
  name: 'CPopoverArrow',
  functional: true,
  render (h, { data, ...rest }) {
    return h(CPopperArrow, {
      ...rest,
      attrs: {
        ...data.attrs,
        'data-chakra-component': 'CPopoverArrow'
      }
    })
  }
}

/**
 * CPopoverCloseButton component
 *
 * The button to close the popover.
 *
 * @extends CCloseButton
 * @see Docs https://vue.chakra-ui.com/popover
 */
const CPopoverCloseButton = {
  name: 'CPopoverCloseButton',
  inheritAttrs: false,
  inject: ['$PopoverContext'],
  computed: {
    context () {
      return this.$PopoverContext()
    }
  },
  render (h) {
    return h(CCloseButton, {
      props: {
        size: 'sm'
      },
      on: {
        click: (e) => {
          this.$emit('click', e)
          this.context.closePopover()
        }
      },
      attrs: {
        pos: 'absolute',
        rounded: 'md',
        top: 1,
        right: 2,
        p: 2,
        ...this.$attrs,
        'data-chakra-component': 'CPopoverCloseButton'
      }
    })
  }
}

/**
 * CPopoverFooter component
 *
 * The footer of the popover.
 *
 * @extends CBox
 * @see Docs https://vue.chakra-ui.com/popover
 */
const CPopoverFooter = {
  name: 'CPopoverFooter',
  functional: true,
  render (h, { data, slots, ...rest }) {
    return h(CBox, {
      props: {
        as: 'footer'
      },
      attrs: {
        px: '0.75rem',
        py: '0.5rem',
        borderTopWidth: '1px',
        ...data.attrs,
        'data-chakra-component': 'CPopoverFooter'
      }
    }, slots().default)
  }
}

export {
  CPopover,
  CPopoverTrigger,
  CPopoverContent,
  CPopoverHeader,
  CPopoverBody,
  CPopoverArrow,
  CPopoverCloseButton,
  CPopoverFooter
}
