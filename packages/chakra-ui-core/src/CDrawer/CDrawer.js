/**
 * Hey! Welcome to @chakra-ui/vue Drawer
 *
 * The Drawer component is a panel that slides out from the edge
 * of the screen. It can be useful when you need users to complete
 * a task or view some details without leaving the current page.
 *
 * @see Docs     https://vue.chakra-ui.com/drawer
 * @see Source   https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CDrawer/CDrawer.js
 * @see A11y     https://github.com/chakra-ui/chakra-ui-vue/blob/master/packages/chakra-ui-core/src/CDrawer/accessibility.md
 */

import styleProps, { baseProps } from '../config/props'
import { forwardProps, HTMLElement } from '../utils'

import { CModal, CModalContent, CModalBody, CModalHeader, CModalFooter, CModalOverlay, CModalCloseButton } from '../CModal'

/**
 * CDrawer component
 *
 * The wrapper for `CDrawer` components. It provides context and state for the drawer.
 *
 * @extends CModal
 * @see Docs https://vue.chakra-ui.com/drawer
 */
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
        formatIds: id => ({
          content: `drawer-${id}`,
          header: `drawer-${id}-header`,
          body: `drawer-${id}-body`
        }),
        ...forwardProps(this.$props)
      },
      attrs: {
        'data-chakra-component': 'CDrawer'
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

  return placements[position] || placements.right
}

/**
 * CDrawerContent component
 *
 * The wrapper for the drawers's content.
 *
 * @extends CModalContent
 * @see Docs https://vue.chakra-ui.com/drawer
 */
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
      },
      attrs: {
        'data-chakra-component': 'CDrawerContent'
      }
    }, this.$slots.default)
  }
}

/**
 * CDrawerOverlay component
 *
 * The dimmed overlay behind the drawer.
 *
 * @extends CModalOverlay
 * @see Docs https://vue.chakra-ui.com/drawer
 */
const CDrawerOverlay = {
  name: 'CDrawerOverlay',
  props: baseProps,
  render (h) {
    return h(CModalOverlay, {
      props: forwardProps(this.$props),
      attrs: {
        'data-chakra-component': 'CDrawerOverlay'
      }
    })
  }
}

/**
 * CDrawerCloseButton component
 *
 * The button that closes the drawer.
 *
 * @extends CModalCloseButton
 * @see Docs https://vue.chakra-ui.com/drawer
 */
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
        click: e => this.$emit('click', e)
      },
      attrs: {
        'data-chakra-component': 'CDrawerCloseButton'
      }
    })
  }
}

/**
 * CDrawerBody component
 *
 * Should contain the description announced by screen readers
 *
 * @extends CModalBody
 * @see Docs https://vue.chakra-ui.com/drawer
 */
const CDrawerBody = {
  ...CModalBody,
  name: 'CDrawerBody'
}

/**
 * CDrawerHeader component
 *
 * Should contain the title announced by screen readers
 *
 * @extends CModalHeader
 * @see Docs https://vue.chakra-ui.com/drawer
 */
const CDrawerHeader = {
  ...CModalHeader,
  name: 'CDrawerHeader'
}

/**
 * CDrawerFooter component
 *
 * Should contain the actions of the drawer
 *
 * @extends CModalFooter
 * @see Docs https://vue.chakra-ui.com/drawer
 */
const CDrawerFooter = {
  ...CModalFooter,
  name: 'CDrawerFooter'
}

export {
  CDrawer,
  CDrawerContent,
  CDrawerOverlay,
  CDrawerCloseButton,
  CDrawerBody,
  CDrawerHeader,
  CDrawerFooter
}
