import PopperJS from 'popper.js'
import PseudoBox from '../PseudoBox'
import ClickOutside from '../ClickOutside'
import Portal from '../Portal'
import { createChainedFunction, forwardProps, isVueComponent, canUseDOM, useId } from '../utils'
import styleProps from '../config/props'
import getPopperArrowStyle from './popper.styles'
import Box from '../Box'

/**
 * Flips placement if in <body dir="rtl" />
 * @param {string} placement
 */
function flipPlacement (placement) {
  const direction =
    (canUseDOM && document.body.getAttribute('dir')) ||
    'ltr'

  if (direction !== 'rtl') {
    return placement
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start'
    case 'bottom-start':
      return 'bottom-end'
    case 'top-end':
      return 'top-start'
    case 'top-start':
      return 'top-end'
    default:
      return placement
  }
}

const popperId = useId(3)

const Popper = {
  name: 'Popper',
  props: {
    id: {
      type: String,
      default: popperId
    },
    as: String,
    isOpen: Boolean,
    placement: {
      type: String,
      default: 'bottom'
    },
    usePortal: {
      type: Boolean,
      default: true
    },
    onClose: {
      type: Function,
      default: () => null
    },
    closeOnClickAway: {
      type: Boolean,
      default: true
    },
    modifiers: {
      type: Object,
      default: () => {}
    },
    anchorEl: [HTMLElement, Object],
    eventsEnabled: {
      type: Boolean,
      default: true
    },
    arrowSize: {
      type: String,
      default: '1rem'
    },
    arrowShadowColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)'
    },
    hasArrow: {
      type: Boolean,
      default: true
    },
    positionFixed: Boolean,
    portalTarget: {
      type: String,
      default: `#chakra-portal-${popperId}`
    },
    ...styleProps
  },
  data () {
    return {
      popper: null
    }
  },
  watch: {
    placement (newValue) {
      if (this.popper) {
        this.popper.options.placement = newValue
        this.popper.scheduleUpdate()
      }
    },
    isOpen (newValue) {
      if (newValue) this.handleOpen()
      else this.handleClose()
    }
  },
  computed: {
    arrowStyles () {
      return getPopperArrowStyle({
        arrowSize: this.arrowSize,
        arrowShadowColor: this.arrowShadowColor,
        hasArrow: this.hasArrow
      })
    },
    rtlPlacement () {
      return flipPlacement(this.placement)
    },
    anchor () {
      return this.getNode(this.anchorEl)
    },
    reference () {
      const ref = this.usePortal
        // There should be a much cleaner way to do this.
        // But for now this works. Should return with bigger guns.
        ? canUseDOM && document.querySelector(this.portalTarget).firstChild
        : this.getNode(this.$el)
      return ref
    }
  },
  methods: {
    /**
     * Handles open state for Popper
     */
    handleOpen () {
      // Double check to make sure portal target is mounted
      // If it already is mounted, Portal component will use
      // the existing portal target to mount popper children
      (this.usePortal && this.$refs.portalRef) && this.$refs.portalRef.mountTarget()

      if (!this.anchor || !this.reference) return
      if (this.popper) {
        this.popper.scheduleUpdate()
      } else {
        this.popper = new PopperJS(this.anchor, this.reference, {
          placement: this.rtlPlacement,
          modifiers: {
            ...(this.usePortal && {
              preventOverflow: {
                boundariesElement: 'window'
              }
            }),
            ...this.modifiers
          },
          onUpdate: createChainedFunction(
            this.handlePopperUpdate
          ),
          onCreate: createChainedFunction(
            this.handlePopperCreated
          ),
          eventsEnabled: this.eventsEnabled,
          positionFixed: this.positionFixed
        })
        this.popper.scheduleUpdate()
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
     * Closes Popper Element
     */
    handleClose () {
      if (this.popper) {
        this.popper.destroy()
        this.popper = null
        this.$emit('popper:close', {})
      }
    },
    /**
     * Wrapped handler for close events
     */
    wrapClose () {
      if (this.popper) {
        if (this.onClose) this.onClose()
        this.$emit('popper:close', {})
      }
    },

    /**
     * Handle's popper updates when update is called
     * @param {Object} payload
     */
    handlePopperUpdate (payload) {
      this.$emit('popper:update', payload)
      this.isOpen && this.$emit('popper:open')
    },

    /**
     * Handle's popper updates when update is called
     * @param {Object} payload
     */
    handlePopperCreated (payload) {
      this.$emit('popper:create', payload)
    }
  },
  render (h) {
    if (this.isOpen && !this.popper) {
      this.handleOpen()
    }
    return h(Portal, {
      props: {
        append: true,
        target: this.portalTarget,
        disabled: !this.usePortal,
        slim: true,
        unmountOnDestroy: true,
        targetSlim: true,
        name: `chakra-portal-${this.id}`
      },
      ref: 'portalRef'
    }, [h(ClickOutside, {
      props: {
        whitelist: [this.anchor],
        isDisabled: !this.closeOnClickAway,
        do: this.wrapClose
      }
    }, [h(PseudoBox, {
      class: [this.arrowStyles],
      style: {
        display: this.isOpen ? 'unset' : 'none'
      },
      attrs: {
        id: `chakra-popper-${this.id}`
      },
      scopedSlots: {
        popperId: `chakra-popper-${this.id}`
      },
      props: {
        ...forwardProps(this.$props)
      },
      ref: 'handleRef'
    }, this.$slots.default)])])
  }
}

const PopperArrow = {
  name: 'PopperArrow',
  render (h) {
    return h(Box, {
      attrs: {
        'x-arrow': true,
        role: 'presentation'
      },
      props: {
        bg: 'inherit',
        ...forwardProps(this.$props)
      }
    })
  }
}

export {
  Popper,
  PopperArrow
}
