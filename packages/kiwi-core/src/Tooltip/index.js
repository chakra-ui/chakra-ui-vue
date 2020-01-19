import Fragment from '../Fragment'
import VisuallyHidden from '../VisuallyHidden'
import { Popper, PopperArrow } from '../Popper'
import { cloneVNode, useId, forwardProps } from '../utils'
import { baseProps } from '../config/props'
import Box from '../Box'

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

const Tooltip = {
  inject: ['$colorMode'],
  name: 'Tooltip',
  data () {
    return {
      isOpen: this.isControlled ? this.controlledIsOpen : this.defaultIsOpen || false,
      enterTimeout: null,
      exitTimeout: null,
      tooltipAnchor: undefined
    }
  },
  computed: {
    colorMode () {
      return this.$colorMode()
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
  render (h) {
    let clone

    // Styles for tooltip
    const _bg = this.colorMode === 'dark' ? 'gray.300' : 'gray.700'
    const _color = this.colorMode === 'dark' ? 'gray.900' : 'whiteAlpha.900'

    // ARIA label for tooltip
    const hasAriaLabel = this._ariaLabel !== undefined

    // Child nodes parsing
    const children = this.$slots.default
    if (children[0].text || this.shouldWrapChildren) {
      clone = (
        clone = h(Box, {
          props: {
            as: 'span'
          },
          attrs: {
            tabIndex: 0,
            id: `__wrapper-${this.tooltipId}`,
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
      // Bind tooltipAnchor ref to variable
      this.tooltipAnchor = document.querySelector(`#__wrapper-${this.tooltipId}`)
    } else {
      clone = cloneVNode(children[0], h)
      clone.elm.onmouseenter = this.handleOpen
      clone.elm.onmouseleave = this.handleClose
      clone.elm.onclick = this.handleClick
      clone.elm.onfocus = this.handleOpen
      clone.elm.onblur = this.handleClose
      this.tooltipAnchor = clone.elm
    }
    /**
     * During cloning, we bind events to the VNodes
     */
    return h(Fragment, [
      clone,
      h(Popper, {
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
          role: hasAriaLabel ? undefined : 'tooltip'
        }
      }, [
        this.label,
        hasAriaLabel && h(VisuallyHidden, {
          attrs: {
            role: 'tooltip',
            id: this.tooltipId
          }
        }, this._ariaLabel),
        this.hasArrow && h(PopperArrow)
      ])
    ])
  }
}

export default Tooltip
