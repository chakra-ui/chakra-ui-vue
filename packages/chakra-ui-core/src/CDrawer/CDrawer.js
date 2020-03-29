import styleProps, { baseProps } from '../config/props'
import { forwardProps, HTMLElement } from '../utils'

import { CModal, CModalContent, CModalBody, CModalHeader, CModalFooter, CModalOverlay, CModalCloseButton } from '../CModal'

const CDrawer = {
  name: 'CDrawer',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: () => null
    },
    closeOnEsc: {
      type: Boolean,
      default: true
    },
    isFullHeight: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'right'
    },
    initialFocusRef: {
      type: [HTMLElement, Object, String, Function],
      default: () => null
    },
    finalFocusRef: {
      type: [HTMLElement, Object, String, Function],
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
    return h(CModal, {
      props: {
        isOpen: this.isOpen,
        onClose: this.onClose,
        closeOnEsc: this.closeOnEsc,
        initialFocusRef: this.initialFocusRef,
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

const CDrawerContent = {
  name: 'CDrawerContent',
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

    return h(CModalContent, {
      props: {
        noStyles: true,
        position: 'fixed',
        ...placementStyles,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

const CDrawerOverlay = {
  name: 'CDrawerOverlay',
  props: baseProps,
  render (h) {
    return h(CModalOverlay, {
      props: forwardProps(this.$props)
    })
  }
}

const CDrawerCloseButton = {
  name: 'CDrawerCloseButton',
  props: styleProps,
  render (h) {
    return h(CModalCloseButton, {
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
  CDrawer,
  CDrawerContent,
  CDrawerOverlay,
  CDrawerCloseButton,
  CModalBody as CDrawerBody,
  CModalHeader as CDrawerHeader,
  CModalFooter as CDrawerFooter
}
