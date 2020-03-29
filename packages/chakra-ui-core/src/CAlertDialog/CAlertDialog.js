import baseProps from '../config/props'
import { forwardProps, HTMLElement } from '../utils'

import {
  CModal,
  CModalContent,
  CModalFooter,
  CModalBody,
  CModalHeader,
  CModalOverlay,
  CModalCloseButton
} from '../CModal'

const formatIds = id => ({
  content: `alert-dialog-${id}`,
  header: `alert-dialog-${id}-label`,
  body: `alert-dialog-${id}-desc`
})

const CAlertDialog = {
  name: 'CAlertDialog',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: () => null
    },
    leastDestructiveRef: [HTMLElement, Object],
    ...baseProps
  },
  render (h) {
    return h(CModal, {
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

const CAlertDialogContent = {
  name: 'CAlertDialogContent',
  props: baseProps,
  render (h) {
    return h(CModalContent, {
      props: forwardProps(this.$props),
      attrs: {
        role: 'alertdialog'
      }
    }, this.$slots.default)
  }
}

export {
  CAlertDialog,
  CAlertDialogContent,
  CModalOverlay as CAlertDialogOverlay,
  CModalBody as CAlertDialogBody,
  CModalHeader as CAlertDialogHeader,
  CModalFooter as CAlertDialogFooter,
  CModalCloseButton as CAlertDialogCloseButton
}
