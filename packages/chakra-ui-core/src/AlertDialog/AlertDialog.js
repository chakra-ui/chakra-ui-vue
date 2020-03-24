import { forwardProps, HTMLElement } from '../utils'
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton
} from '../Modal'

const formatIds = id => ({
  content: `alert-dialog-${id}`,
  header: `alert-dialog-${id}-label`,
  body: `alert-dialog-${id}-desc`
})

const AlertDialog = {
  name: 'AlertDialog',
  extends: Modal,
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: () => null
    },
    leastDestructiveRef: [HTMLElement, Object]
  },
  render (h) {
    return h(Modal, {
      props: {
        isOpen: this.isOpen,
        onClose: this.onClose,
        initialFocusRef: this.leastDestructiveRef,
        formatIds,
        ...forwardProps(this.$props)
      }
    }, this.$slots.default)
  }
}

const AlertDialogContent = {
  name: 'AlertDialogContent',
  props: ModalContent,
  render (h) {
    return h(ModalContent, {
      props: forwardProps(this.$props),
      attrs: {
        role: 'alertdialog'
      }
    }, this.$slots.default)
  }
}

export {
  AlertDialog,
  AlertDialogContent,
  ModalOverlay as AlertDialogOverlay,
  ModalBody as AlertDialogBody,
  ModalHeader as AlertDialogHeader,
  ModalFooter as AlertDialogFooter,
  ModalCloseButton as AlertDialogCloseButton
}
