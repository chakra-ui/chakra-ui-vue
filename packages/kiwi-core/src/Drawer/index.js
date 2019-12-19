// import { provide, inject, createElement as h } from '@vue/composition-api'
import { baseProps } from '../config/props'
// import { forwardProps } from '../utils'
import {
// Modal,
// ModalBody,
// ModalContent,
// ModalFooter,
// ModalHeader,
// ModalOverlay,
// ModalCloseButton
} from '../Modal'

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

  }
}

export {
  Drawer
}
