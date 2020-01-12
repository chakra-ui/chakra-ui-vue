import styled from 'vue-styled-components'
import PopperJS from 'popper.js'
import PseudoBox from '../PseudoBox'
import { createChainedFunction, forwardProps, isVueComponent, canUseDOM } from '../utils'
import { baseProps } from '../config/props'
import ClickOutside from '../ClickOutside'

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

const PopperBox = styled(PseudoBox, {
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
  }
})`
  [x-arrow] {
    width: ${props => props.arrowSize};
    height: ${props => props.arrowSize};
    position: absolute;
    transform: rotate(45deg);
    z-index: -1;

    &::before {
      content: "";
      width: ${props => props.arrowSize};
      height: ${props => props.arrowSize};
      position: absolute;
      z-index: -1;
    }
  }

  [x-placement^="top"] {
    margin-bottom: ${props => props.hasArrow ? `calc(${props.arrowSize} / 2)` : null};
    transform-origin: bottom center;
  }

  [x-placement^="top"] [x-arrow] {
    bottom: calc(${props => props.arrowSize} / 2 * -1);

    &::before {
      box-shadow: 2px 2px 2px 0 ${props => props.arrowShadowColor};
    }
  }

  [x-placement^="bottom"] {
    margin-top: ${props => props.hasArrow ? `calc(${props.arrowSize} / 2)` : null};
    transform-origin: top center;
  }

  [x-placement^="bottom"] [x-arrow] {
    top: calc(${props => props.arrowSize} / 2 * -1);

    &::before {
      box-shadow: -1px -1px 1px 0 ${props => props.arrowShadowColor};
    }
  }

  [x-placement^="right"] {
    margin-left: ${props => props.hasArrow ? `calc(${props.arrowSize} / 2)` : null};
    transform-origin: left center;
  }

  [x-placement^="right"] [x-arrow] {
    left: calc(${props => props.arrowSize} / 2 * -1);

    &::before {
      box-shadow: -1px 1px 1px 0 ${props => props.arrowShadowColor};
    }
  }

  [x-placement^="left"] {
    margin-right: ${props => props.hasArrow ? `calc(${props.arrowSize} / 2)` : null};
    transform-origin: right center;
  }

  [x-placement^="left"] [x-arrow] {
    right: calc(${props => props.arrowSize} / 2 * -1);
    &::before {
      box-shadow: 1px -1px 1px 0 ${props => props.arrowShadowColor};
    }
  }
`

const Popper = {
  name: 'Popper',
  props: {
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
    arrowShadowColor: String,
    positionFixed: Boolean,
    hasArrow: {
      type: Boolean,
      default: true
    },
    ...baseProps
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
    rtlPlacement () {
      return flipPlacement(this.placement)
    },
    anchor () {
      return this.getNode(this.anchorEl)
    },
    reference () {
      return this.getNode(this.$el.firstChild)
    }
  },
  methods: {
    /**
     * Handles open state for Popper
     */
    handleOpen () {
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
    let children = this.$slots.default

    // Open is true but Popper instance is destroyed
    if (this.isOpen && !this.popper) {
      this.handleOpen()
    }

    if (this.closeOnClickAway) {
      return h(ClickOutside, {
        props: {
          whitelist: [this.anchor],
          active: this.closeOnClickAway,
          do: this.wrapClose
        }
      }, [h(PopperBox, {
        style: {
          display: this.isOpen ? 'unset' : 'none'
        },
        props: {
          ...forwardProps(this.$props)
        },
        ref: 'handleRef'
      }, children)])
    } else {
      return h(PopperBox, {
        style: {
          display: this.isOpen ? 'unset' : 'none'
        },
        props: {
          ...forwardProps(this.$props)
        },
        ref: 'handleRef'
      }, children)
    }
  }
}

const PopperArrow = {
  name: 'PopperArrow',
  render (h) {
    return h('div', {
      style: {
        background: 'inherit'
      },
      attrs: {
        'x-arrow': true,
        role: 'presentation'
      }
    })
  }
}

export {
  Popper,
  PopperArrow
}
