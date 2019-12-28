import { provide, inject, createElement as h, computed } from '@vue/composition-api'
import styleProps, { baseProps } from '../config/props'
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalCloseButton } from '../Modal'
import { forwardProps } from '../utils'

const DrawerContext = Symbol('DrawerContext')

/**
 * ABOUT THIS COMPONENT
 * The drawer component composes some of the Modal compound components. It works as required.
 *
 * However, because this currently implementation uses Portal-Vue under the hood, there is no
 * direct/easy-to-implement to manage transitioning within portals
 *
 * Thus, the drawer doesn't transition any of it's components when being shown or hidden.
 * That being said, I need to find a way to implement transitioning in the portal:
 * 1) When the component is mounted.
 * 2) When the component is hidden before removing the portal target.
 */

const Drawer = {
  name: 'Drawer',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: () => null
    },
    isFullHeight: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'right'
    },
    finalFocusRef: {
      type: [HTMLElement, Object],
      default: () => null
    },
    size: {
      type: String,
      default: 'xs'
    },
    ...baseProps
  },
  setup (props, context) {
    const size = computed(() => props.size)
    const isOpen = computed(() => props.isOpen)
    const placement = computed(() => props.placement)
    const isFullHeight = computed(() => props.isFullHeight)

    provide(DrawerContext, { size, isOpen, placement, isFullHeight })
    return () => {
      return h(Modal, {
        props: {
          isOpen: props.isOpen,
          onClose: props.onClose,
          finalFocusRef: props.finalFocusRef,
          formatIds: (id) => ({
            content: `drawer-${id}`,
            header: `drawer-${id}-header`,
            body: `drawer-${id}-body`
          }),
          ...forwardProps(props)
        }
      }, context.slots.default())
    }
  }
}

// ? To be used when adding transitions to drawer.
// const drawerSizes = {
//   xs: 'xs',
//   sm: 'md',
//   md: 'lg',
//   lg: '2xl',
//   xl: '4xl',
//   full: '100vw'
// }

const getPlacementStyles = (position, { finalWidth, finalHeight }) => {
  const placements = {
    bottom: {
      maxWidth: '100vw',
      height: finalHeight,
      bottom: 0,
      left: 0,
      right: 0
    },
    top: {
      maxWidth: '100vw',
      height: finalHeight,
      top: 0,
      left: 0,
      right: 0
    },
    left: {
      ...(finalWidth && { maxWidth: finalWidth }),
      height: '100vh',
      left: 0,
      top: 0
    },
    right: {
      ...(finalWidth && { maxWidth: finalWidth }),
      right: 0,
      top: 0,
      height: '100vh'
    }
  }

  return placements[position] || placements['right']
}

const DrawerContent = {
  name: 'DrawerContent',
  props: {
    ...baseProps
  },
  setup (props, context) {
    const { placement, isFullHeight } = inject(DrawerContext)
    const placementStyles = getPlacementStyles(placement.value, {
      finalHeight: isFullHeight.value ? '100vh' : 'auto'
    })

    return () => {
      return h(ModalContent, {
        props: {
          noStyles: true,
          position: 'fixed',
          ...placementStyles,
          ...forwardProps(props)
        }
      }, context.slots.default())
    }
  }
}

const DrawerOverlay = {
  name: 'DrawerOverlay',
  props: {
    forwardRef: {
      type: HTMLElement,
      default: null
    },
    ...baseProps
  },
  setup (props) {
    return () => {
      return h(ModalOverlay, {
        props: {
          ...forwardProps(props)
        },
        ref: props.forwardRef
      })
    }
  }
}

const DrawerCloseButton = {
  name: 'DrawerCloseButton',
  props: {
    forwardRef: {
      type: HTMLElement,
      default: null
    },
    ...styleProps
  },
  setup (props, context) {
    return () => {
      return h(ModalCloseButton, {
        props: {
          position: 'fixed',
          zIndex: '1',
          ...forwardProps(props)
        },
        ref: props.forwardRef
      })
    }
  }
}

export {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  ModalBody as DrawerBody,
  ModalHeader as DrawerHeader,
  ModalFooter as DrawerFooter
}
