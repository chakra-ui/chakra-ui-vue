import styleProps, { baseProps } from '../config/props'
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter, ModalOverlay, ModalCloseButton } from '../Modal'
import { forwardProps } from '../utils'

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
      type: Object,
      default: () => null
    },
    size: {
      type: String,
      default: 'xs'
    },
    ...baseProps
  },
  provide () {
    return {
      $DrawerContext: () => this.DrawerContext
    }
  },
  computed: {
    DrawerContext () {
      return {
        size: this.size,
        isOpen: this.isOpen,
        placement: this.placement,
        isFullHeight: this.isFullHeight
      }
    }
  },
  render (h) {
    return h(Modal, {
      props: {
        isOpen: this.isOpen,
        onClose: this.onClose,
        finalFocusRef: this.finalFocusRef,
        formatIds: (id) => ({
          content: `drawer-${id}`,
          header: `drawer-${id}-header`,
          body: `drawer-${id}-body`
        }),
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

const getPlacementStyles = (position, { finalWidth, finalHeight }) => {
  const placements = {
    bottom: {
      maxWidth: '100vw',
      height: 'auto',
      bottom: 0,
      left: 0,
      right: 0
    },
    top: {
      maxWidth: '100vw',
      height: 'auto',
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
  inject: ['$DrawerContext'],
  computed: {
    context () {
      return this.$DrawerContext()
    }
  },
  render (h) {
    const { placement, isFullHeight } = this.context
    const placementStyles = getPlacementStyles(placement, {
      finalHeight: isFullHeight ? '100vh' : 'auto'
    })

    return h(ModalContent, {
      props: {
        noStyles: true,
        position: 'fixed',
        ...placementStyles,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

const DrawerOverlay = {
  name: 'DrawerOverlay',
  props: baseProps,
  render (h) {
    return h(ModalOverlay, {
      props: forwardProps(this.$props)
    })
  }
}

const DrawerCloseButton = {
  name: 'DrawerCloseButton',
  props: styleProps,
  render (h) {
    return h(ModalCloseButton, {
      props: {
        position: 'fixed',
        zIndex: '1',
        ...forwardProps(this.$props)
      },
      on: {
        click: (e) => this.$emit('click', e)
      }
    })
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
