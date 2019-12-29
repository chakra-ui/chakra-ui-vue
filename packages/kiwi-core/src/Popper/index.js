import { createElement as h, ref, watch, computed } from '@vue/composition-api'
import PopperJS from 'popper.js'
// import PseudoBox from '../PseudoBox'
import Box from '../Box'
import { createChainedFunction, forwardProps } from '../utils'
import { baseProps } from '../config/props'

/**
 * Flips placement if in <body dir="rtl" />
 * @param {string} placement
 */
function flipPlacement (placement) {
  const direction =
    (typeof window !== 'undefined' && document.body.getAttribute('dir')) ||
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
 * Gets Anchor element for Popper.js
 * @param {HTMLElement|import('@vue/composition-api').Ref} anchorEl
 * @returns {HTMLElement}
 */
function getAnchorEl (anchorEl) {
  return typeof anchorEl === 'object' ? anchorEl.value : anchorEl
}

const Popper = {
  name: 'Popper',
  props: {
    anchorEl: [HTMLElement, Object],
    gutter: [String, Array],
    container: [HTMLElement, Object],
    usePortal: {
      type: Boolean,
      default: true
    },
    unmountOnExit: {
      type: Boolean,
      default: true
    },
    modifiers: {
      type: Object,
      default: () => {}
    },
    isOpen: Boolean,
    placement: {
      type: String,
      default: 'bottom'
    },
    popperOptions: {
      type: Object,
      default: () => {}
    },
    popperRef: [HTMLElement, Object],
    willUseTransition: {
      type: Boolean,
      default: false
    },
    arrowSize: [String, Array],
    arrowShadowColor: [String, Array],
    hasArrow: [String, Array],
    ...baseProps
  },
  setup (props, context) {
    const initialPlacement = computed(() => props.placement)
    // const popperRefProp = computed(() => props.popperRef)
    const tooltipRef = ref(null)
    // const ownRef = ref(null)
    const popperRef = ref(null)
    const handlePopperRef = ref(null)
    const exited = ref(true)

    const rtlPlacement = flipPlacement(initialPlacement.value)
    const placement = ref(rtlPlacement)

    if (rtlPlacement !== placement.value) {
      placement.value = rtlPlacement
    }

    // Methods
    const handleOpen = (anchorEl, usePortal, modifiers, isOpen, rtlPlacement, popperOptions) => {
      const popperNode = tooltipRef.value

      if (!popperNode || !anchorEl || !isOpen) {
        return
      }

      // Might need to directly use popperRef
      if (popperRef.value) {
        popperRef.value.destroy()
        handlePopperRef.value = null
      }

      const handlePopperUpdate = data => {
        placement.value = data.placement
      }

      const popper = new PopperJS(getAnchorEl(anchorEl), popperNode, {
        placement: rtlPlacement,
        ...popperOptions,
        modifiers: {
          ...(usePortal && {
            preventOverflow: {
              boundariesElement: 'window'
            }
          }),
          ...modifiers,
          ...popperOptions.modifiers
        },
        onUpdate: createChainedFunction(
          handlePopperUpdate,
          popperOptions.onUpdate
        )
      })
      handlePopperRef.value = popper
    }

    watch([props.anchorEl, props.usePortal, props.modifiers, props.isOpen, props.rtlPlacement, props.popperOptions],
      ([anchorEl, usePortal, modifiers, isOpen, rtlPlacement, popperOptions]) => {
        handleOpen(anchorEl, usePortal, modifiers, isOpen, rtlPlacement, popperOptions)
      })

    // const handleRef = computed(() => {
    //   handleOpen()
    //   return ownRef
    // })

    // const handleEnter = () => {
    //   exited.value = false
    // }

    const handleClose = () => {
      if (!popperRef.value) {
        return
      }

      popperRef.value.destroy()
      handlePopperRef.value = null
    }

    // const handleExited = () => {
    //   exited.value = true
    //   handleClose()
    // }

    watch(() => {
      if (!props.isOpen && !props.willUseTransition) {
        handleClose()
      }
    })

    if (props.unmountOnExit && !props.isOpen && (!props.willUseTransition || exited.value)) {
      return () => null
    }

    /**
     * TODO: Create styles for transitions in portal
     */
    // const childProps = { placement: placement.value }

    // watch(() => {
    //   if (props.willUseTransition) {
    //     childProps.transition = {
    //       in: props.isOpen,
    //       onEnter: handleEnter,
    //       onExited: handleExited
    //     }
    //   }
    // })

    return () => {

    }
  }
}

export const PoopperArrow = {
  name: 'PopperArrow',
  props: {
    ...baseProps
  },
  setup (props) {
    return h(Box, {
      props: {
        bg: 'inherit',
        ...forwardProps(props)
      },
      attrs: {
        'x-arrow': '',
        role: 'presentation'
      }
    })
  }
}

export default Popper
