import { baseProps } from '../config/props'
import { cloneVNode, useId, forwardProps, wrapEvent } from '../utils'

import CFragment from '../CFragment'
import CVisuallyHidden from '../CVisuallyHidden'
import { CPopper, CPopperArrow } from '../CPopper'
import CBox from '../CBox'

const tooltipProps = {
  label: String,
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
    default: 'top'
  },
  hasArrow: Boolean,
  closeOnClick: Boolean,
  defaultIsOpen: Boolean,
  shouldWrapChildren: Boolean,
  controlledIsOpen: Boolean,
  isControlled: Boolean,
  onOpen: Function,
  onClose: Function,
  ...baseProps
}

// TODO: Add isControlled support.
const CTooltip = {
  inject: ['$chakraColorMode'],
  name: 'CTooltip',
  data () {
    return {
      isOpen: this.isControlled ? this.controlledIsOpen : this.defaultIsOpen || false,
      enterTimeout: null,
      exitTimeout: null,
      tooltipAnchor: undefined,
      noop: 0
    }
  },
  computed: {
    colorMode () {
      return this.$chakraColorMode()
    },
    tooltipId () {
      return `tooltip-${useId(4)}`
    }
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    },
    openWithDelay () {
      this.enterTimeout = setTimeout(this.open, this.showDelay)
    },
    closeWithDelay () {
      this.exitTimeout = setTimeout(this.close, this.hideDelay)
    },
    handleOpen () {
      if (!this.isControlled) {
        this.openWithDelay()
      }
      this.open && this.open()
      this.$emit('open')
    },
    handleClose () {
      if (!this.isControlled) {
        this.closeWithDelay()
      }
      this.close && this.close()
      this.$emit('close')
    },
    handleClick () {
      this.closeOnClick && this.closeOnClick()
      this.$emit('click')
    }
  },
  props: tooltipProps,
  mounted () {
    // When component is mounted we force re-render because component
    // children may not yet be rendered so event listeners may not be
    // Attached immediately.
    this.$nextTick(() => {
      this.noop++
      this.tooltipAnchor = document.querySelector(`[x-tooltip-anchor=${this.tooltipId}]`)
    })
  },
  render (h) {
    let clone

    // Styles for tooltip
    const _bg = this.colorMode === 'dark' ? 'gray.300' : 'gray.700'
    const _color = this.colorMode === 'dark' ? 'gray.900' : 'whiteAlpha.900'

    // ARIA label for tooltip
    const hasAriaLabel = this._ariaLabel !== undefined

    // Child nodes parsing
    const children = this.$slots.default
    if (children.length > 1) {
      return console.error('[ChakraUI]: The CTooltip component only expects one child.')
    }
    if (children[0].text || this.shouldWrapChildren) {
      clone = (
        clone = h(CBox, {
          props: {
            as: 'span'
          },
          attrs: {
            tabIndex: 0,
            'x-tooltip-anchor': `${this.tooltipId}`,
            ...(this.isOpen && { 'aria-describedby': this.tooltipId })
          },
          on: {
            mouseenter: this.handleOpen,
            mouseleave: this.handleClose,
            click: this.handleClick,
            focus: this.handleOpen,
            blur: this.handleClose
          },
          ref: 'tooltipRef'
        }, children[0].text)
      )
    } else {
      const cloned = cloneVNode(children[0], h)
      if (cloned.componentOptions) {
        /**
         * For now consumer's need to use `.native` modifier on events
         * because we're cloning vnodes and I presently do not know how
         * to capture those events and log them.
         *
         * In the future it will be good to implement such.
         * -> We'd like to be able to wrap cloned VNode events with our
         * internal tooltips events.
         */
        clone = h(cloned.componentOptions.Ctor, {
          ...cloned.data,
          ...(cloned.componentOptions.listeners || {}),
          props: {
            ...(cloned.data.props || {}),
            ...cloned.componentOptions.propsData
          },
          attrs: {
            ...cloned.data.attrs,
            'x-tooltip-anchor': `${this.tooltipId}`
          },
          on: cloned.componentOptions.listeners,
          nativeOn: {
            'mouseenter': this.handleOpen,
            'mouseleave': this.handleClose,
            'click': wrapEvent(this.handleClick, (e) => this.$emit('click', e)),
            'focus': this.handleOpen,
            'blur': this.handleClose
          }
        }, cloned.componentOptions.children)
      }
    }

    return h(CFragment, [
      clone,
      h(CPopper, {
        props: {
          usePortal: true,
          anchorEl: this.tooltipAnchor,
          hasArrow: true,
          isOpen: this.isOpen,
          placement: this.placement,
          modifiers: {
            offset: {
              enabled: true,
              offset: '0, 8'
            }
          },
          arrowSize: '10px',
          px: '8px',
          py: '2px',
          _id: this.tooltipId,
          bg: _bg,
          borderRadius: 'sm',
          fontWeight: 'medium',
          pointerEvents: 'none',
          color: _color,
          fontSize: 'sm',
          shadow: 'md',
          maxW: '320px',
          ...forwardProps(this.$props)
        },
        attrs: {
          id: hasAriaLabel ? undefined : this.tooltipId,
          role: hasAriaLabel ? undefined : 'tooltip',
          'data-noop': this.noop
        }
      }, [
        this.label,
        hasAriaLabel && h(CVisuallyHidden, {
          attrs: {
            role: 'tooltip',
            id: this.tooltipId
          }
        }, this._ariaLabel),
        this.hasArrow && h(CPopperArrow)
      ])
    ])
  }
}

export default CTooltip
