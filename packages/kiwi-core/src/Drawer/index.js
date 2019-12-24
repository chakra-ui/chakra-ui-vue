import { provide, inject, createElement as h, computed } from '@vue/composition-api'
import { baseProps } from '../config/props'
import { Slide } from '../Transition'
import { Modal, ModalContent } from '../Modal'
import { forwardProps } from '../utils'

const DrawerContext = Symbol('DrawerContext')

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
      }, [h(Slide, {
        props: {
          in: props.isOpen,
          from: props.placement,
          finalHeight: props.isFullHeight ? '100vh' : 'auto'
        }
      }, h('div', {}, context.slots.default()))])
    }
  }
}

const drawerSizes = {
  xs: 'xs',
  sm: 'md',
  md: 'lg',
  lg: '2xl',
  xl: '4xl',
  full: '100vw'
}

const getPlacementStyles = (position, { finalWidth, finalHeight }) => {
  const placements = {
    bottom: {
      maxWidth: '100vw',
      height: finalHeight,
      top: '100vh',
      left: 0,
      right: 0
    },
    top: {
      maxWidth: '100vw',
      height: finalHeight,
      bottom: '100vh',
      left: 0,
      right: 0
    },
    left: {
      ...(finalWidth && { maxWidth: finalWidth }),
      height: '100vh',
      right: '100vw',
      top: 0
    },
    right: {
      ...(finalWidth && { maxWidth: finalWidth }),
      left: '100vw',
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
    const { size, placement, isFullHeight } = inject(DrawerContext)
    const placementStyles = getPlacementStyles(placement.value, {
      finalHeight: isFullHeight.value ? '100vh' : 'auto'
    })
    const _size = size.value in drawerSizes ? drawerSizes[size.value] : size.value
    return () => {
      return h(ModalContent, {
        props: {
          noStyles: true,
          position: 'fixed',
          maxWidth: _size,
          ...placementStyles,
          ...forwardProps(props)
        }
      }, context.slots.default())
    }
  }
}

export {
  Drawer,
  DrawerContent
}
