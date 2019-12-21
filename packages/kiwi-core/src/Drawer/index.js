import { provide, inject, createElement as h, computed } from '@vue/composition-api'
import { baseProps } from '../config/props'
import { Slide } from '../Transition'
import { Modal, ModalContent } from '../Modal'
import { forwardProps, unwrapValues } from '../utils'

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
    provide(DrawerContext, { size })
    return () => {
      return h(Slide, {
        props: {
          in: props.isOpen,
          from: props.placement,
          finalHeight: props.isFullHeight ? '100vh' : 'auto'
        }
      }, [h(Modal, {
        props: {
          isOpen: true,
          onClose: props.onClose,
          finalFocusRef: props.finalFocusRef,
          formatIds: (id) => ({
            content: `drawer-${id}`,
            header: `drawer-${id}-header`,
            body: `drawer-${id}-body`
          }),
          ...forwardProps(props)
        }
      }, context.slots.default())])
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

const DrawerContent = {
  name: 'DrawerContent',
  props: {
    ...baseProps
  },
  setup (props, context) {
    const placementStyles = inject('SlidePlacementStyles')
    const { size } = inject(DrawerContext)

    const _size = size.value in drawerSizes ? drawerSizes[size.value] : size.value

    return () => {
      return h(ModalContent, {
        props: {
          noStyles: true,
          position: 'fixed',
          maxWidth: _size,
          ...unwrapValues(placementStyles),
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
