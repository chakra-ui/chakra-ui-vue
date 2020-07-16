/**
 * Hey! Welcome to @chakra-ui/vue Tooltip
 *
 * A Tooltip is a popup that displays information related
 * to an element when the element receives keyboard focus
 * or the mouse hovers over it
 *
 * 🚨NOTE: The WAI-ARIA design pattern for Tooltips is work in
 * progress; it does not yet have task force consensus.
 * Progress and discussions are captured in
 * [issue 128](https://github.com/w3c/aria-practices/issues/128).
 *
 * @see Docs     https://vue.chakra-ui.com/tooltip
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CTooltip/CTooltip.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CTooltip/accessibility.md
 */

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
  onClose: Function
}

/**
 * CTooltip component
 *
 * A tooltip is a brief, informative message that appears when a
 * user interacts with an element.
 *
 * The `CTooltip` achieves this by cloning it's children VNodes
 * and then attaches hover and focus events to it in order to display
 * and hide the tooltip conveniently as per WAI-ARIA specs
 *
 * @extends CPopper
 * @see Docs https://vue.chakra-ui.com/tooltip
 */
const CTooltip = {
  name: 'CTooltip',
  inject: ['$chakraColorMode'],
  inheritAttrs: false,
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
    },
    handleKeydown (event) {
      const { key } = event
      if (key === 'Escape') {
        this.handleClose()
      }
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
            blur: this.handleClose,
            keydown: this.handleKeydown
          },
          ref: 'tooltipRef'
        }, children[0].text)
      )
    } else {
      const cloned = cloneVNode(children[0], h)
      if (cloned.componentOptions) {
        clone = h(cloned.componentOptions.Ctor, {
          ...cloned.data,
          ...(cloned.componentOptions.listeners || {}),
          props: {
            ...(cloned.data.props || {}),
            ...cloned.componentOptions.propsData
          },
          attrs: {
            ...cloned.data.attrs,
            ...(this.isOpen && { 'aria-describedby': this.tooltipId }),
            'x-tooltip-anchor': `${this.tooltipId}`
          },
          on: cloned.componentOptions.listeners,
          nativeOn: {
            mouseenter: this.handleOpen,
            mouseleave: this.handleClose,
            click: wrapEvent(this.handleClick, e => this.$emit('click', e)),
            focus: this.handleOpen,
            blur: this.handleClose,
            keydown: this.handleKeydown
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
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          }],
          arrowSize: '10px',
          ...forwardProps(this.$props)
        },
        attrs: {
          px: '8px',
          py: '2px',
          bg: _bg,
          borderRadius: 'sm',
          fontWeight: 'medium',
          pointerEvents: 'none',
          color: _color,
          fontSize: 'sm',
          shadow: 'md',
          maxW: '320px',
          ...this.$attrs,
          id: hasAriaLabel ? undefined : this.tooltipId,
          role: hasAriaLabel ? undefined : 'tooltip',
          'data-noop': this.noop,
          'data-chakra-component': 'CTooltip'
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
