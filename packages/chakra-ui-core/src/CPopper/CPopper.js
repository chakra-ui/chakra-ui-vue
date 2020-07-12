/**
 * Hey! Welcome to @chakra-ui/vue Popper
 *
 * The Popper component is an internal utility component used
 * to wrap the Popper.js library in to a Vue component
 */

import merge from 'lodash-es/merge'
import { createPopper } from '@popperjs/core'
import { createChainedFunction, isVueComponent, canUseDOM, useId, HTMLElement } from '../utils'
import ClickOutside from '../directives/clickoutside.directive'

import CBox from '../CBox'
import CPseudoBox from '../CPseudoBox'
import CPortal from '../CPortal'
import getPopperArrowStyle from './utils/popper.styles'

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

/**
 * CPopper component
 *
 * The popper.js component
 *
 * @extends CPseudoBox
 * @see PopperJs https://popper.js.org/
 */
const CPopper = {
  name: 'CPopper',
  inheritAttrs: false,
  directives: {
    ClickOutside
  },
  props: {
    as: {
      type: [String, Object],
      default: 'div'
    },
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
      type: Array,
      default: () => ([])
    },
    anchorEl: HTMLElement,
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
    usePortalTarget: String
  },
  data () {
    return {
      popper: null,
      referenceBackgroundColor: undefined
    }
  },
  watch: {
    placement (newValue) {
      if (this.popper) {
        this.popper.options.placement = newValue
        this.reference.setAttribute('data-show', '')
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
        hasArrow: this.hasArrow,
        bg: this.referenceBackgroundColor
      })
    },
    portalTarget () {
      return this.usePortalTarget || `#chakra-portal-${useId(4)}`
    },
    popperId () {
      return `popper_${useId(4)}`
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
    },
    computedModifiers () {
      return merge([
        this.usePortal && {
          name: 'preventOverflow',
          options: {
            boundary: 'window'
          }
        },
        {
          name: 'offset',
          options: {
            offset: [0, 10]
          }
        },
        {
          name: 'arrow',
          options: {
            element: '[data-popper-arrow]',
            transform: 'rotate(45deg)'
          }
        }
      ], this.modifiers)
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
        this.reference.setAttribute('data-show', '')
        this.popper.update()
          .then(() => {
            if (this.hasArrow) {
              const arrow = this.reference.querySelector(['[data-popper-arrow]'])
              if (arrow) {
                this.$nextTick(() => {
                  this.referenceBackgroundColor =
                    getComputedStyle(this.reference).backgroundColor ||
                    getComputedStyle(this.reference).background
                })
              }
            }
          })
      } else {
        this.popper = createPopper(this.anchor, this.reference, {
          placement: this.rtlPlacement,
          modifiers: this.computedModifiers,
          onUpdate: createChainedFunction(
            this.handlePopperUpdate
          ),
          onFirstUpdate: createChainedFunction(
            this.handlePopperCreated
          ),
          eventListeners: {
            resize: true,
            scroll: true
          },
          eventsEnabled: this.eventsEnabled,
          positionFixed: this.positionFixed
        })
        this.reference.setAttribute('data-show', '')
        this.popper.update()
          .then(() => {
            if (this.hasArrow) {
              const arrow = this.reference.querySelector(['[data-popper-arrow]'])
              if (arrow) {
                this.$nextTick(() => {
                  this.referenceBackgroundColor =
                    getComputedStyle(this.reference).backgroundColor ||
                    getComputedStyle(this.reference).background
                })
              }
            }
          })
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
        this.reference.removeAttribute('data-show')
        this.$emit('close', {})
      }
    },
    /**
     * Wrapped handler for clickaway events
     */
    wrapClose (e) {
      if (this.popper && !(this.anchor.contains(e.target))) {
        this.handleClose()
      }
    },

    /**
     * Handle's popper updates when update is called
     * @param {Object} payload
     */
    handlePopperUpdate (payload) {
      this.$emit('update', payload)
      this.isOpen && this.$emit('open')
    },

    /**
     * Handle's popper updates when update is called
     * @param {Object} payload
     */
    handlePopperCreated (payload) {
      this.$emit('create', payload)
    }
  },
  beforeDestroy () {
    this.popper && this.popper.destroy()
    this.popper = null
  },
  render (h) {
    if (this.isOpen && !this.popper) {
      this.handleOpen()
    }
    return h(CPortal, {
      props: {
        append: true,
        target: this.portalTarget,
        disabled: !this.usePortal,
        slim: true,
        unmountOnDestroy: true,
        targetSlim: true
      },
      ref: 'portalRef'
    }, [h(CPseudoBox, {
      class: [this.arrowStyles],
      style: {
        display: this.isOpen ? 'unset' : 'none'
      },
      props: { as: this.as },
      directives: [{
        name: 'click-outside',
        value: this.wrapClose
      }],
      attrs: {
        ...this.$attrs,
        id: this.$attrs.id || `chakra-${this.popperId}`,
        'data-popper-id': `chakra-${this.popperId}`,
        'data-chakra-component': 'CPopper'
      },
      scopedSlots: {
        popperId: `chakra-${this.popperId}`
      },
      ref: 'handleRef'
    }, this.$slots.default)])
  }
}

const CPopperArrow = {
  name: 'CPopperArrow',
  functional: true,
  render (h, { data, ...rest }) {
    return h(CBox, {
      ...rest,
      attrs: {
        ...data.attrs,
        'x-arrow': true,
        'data-popper-arrow': true,
        role: 'presentation',
        'data-chakra-component': 'CPopperArrow'
      }
    })
  }
}

export {
  CPopper,
  CPopperArrow
}
